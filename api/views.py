import json

from django.contrib.auth import authenticate, login
from django.contrib.sessions.models import Session
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Cart, Customer, Order, Product
from .serializers import (CartSerializer, CreateRoomSerializer,
                          CustomerSerializer, OrderSerializer,
                          ProductSerializer, UserSerializer)


def my_view(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        return Response(data='success', status=status.HTTP_200_OK)
    else:
        # Return an 'invalid login' error message.
        return Response({'Bad Request': 'ProductId paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

# Create your user views here.
class UserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = Customer.objects.all()

# Create your customer views here.
class CustomerView(generics.CreateAPIView):
    serializer_class = CustomerSerializer

    def get(self, request, format=None):
        session_key = self.request.session.session_key
        session = Session.objects.get(session_key=session_key)
        uid = session.get_decoded().get('_auth_user_id')

        if session:
            queryset = Customer.objects.filter(user_id=uid)
            # productId = request.GET.get(self.lookup_url_kwarg)
            if queryset.exists():
                data = CustomerSerializer(queryset[0]).data
                return Response(json.dumps(data), status=status.HTTP_200_OK)
            return Response({'Product Not Found': 'Invalid Product Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Session key paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        # productId = request.GET.get(self.lookup_url_kwarg)
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()

        session_key = self.request.session.session_key
        session = Session.objects.get(session_key=session_key)
        uid = session.get_decoded().get('_auth_user_id')
        # user = Customer.objects.get(pk=uid)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():

            name = serializer.data.get('name')
            email = serializer.data.get('email')
            phoneNumber = serializer.data.get('phoneNumber')
            address = serializer.data.get('address')

            queryset = Customer.objects.filter(user_id=uid)
            if queryset.exists():
                guest = queryset[0]
                guest.name = name
                guest.email = email
                guest.phoneNumber = phoneNumber
                guest.address = address
                guest.save(update_fields=['name', 'email', 'phoneNumber', 'address'])
                return Response(data=CustomerSerializer(guest).data, status=status.HTTP_200_OK)
            else:
                guest = Cart(user_id = uid, name = name, email = email, phoneNumber = phoneNumber, address = address)
                guest.save()
                return Response(data=CustomerSerializer(guest).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'ProductId paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)


# Create your product views here.
class GetProduct(APIView):
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'productId'

    def get(self, request, format=None):
        productId = request.GET.get(self.lookup_url_kwarg)
        if productId != None:
            product = Product.objects.filter(id=productId)
            if len(product) > 0:
                data = ProductSerializer(product[0]).data
                # data['is_host'] = self.request.session.session_key == product[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Product Not Found': 'Invalid Product Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'ProductId paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class GetAllProduct(APIView):
    serializer_class = ProductSerializer
    def get(self, request, format=None):
            product = Product.objects.all()
            if len(product) > 0:
                data = []
                for x in product:
                    data.append(ProductSerializer(x).data)
                # data['is_host'] = self.request.session.session_key == product[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Product Not Found': 'Invalid Product Code.'}, status=status.HTTP_404_NOT_FOUND)

# Create your cart here.
class CartView(APIView):
    serializer_class = CartSerializer
    lookup_url_kwarg = 'productId'

    def get(self, request, format=None):
        session_key = self.request.session.session_key
        session = Session.objects.get(session_key=session_key)
        uid = session.get_decoded().get('_auth_user_id')

        if session:
            queryset = Cart.objects.filter(customer_id=uid)
            # productId = request.GET.get(self.lookup_url_kwarg)
            if queryset.exists():
                # data = CartSerializer(queryset[0]).data
                data = []
                for product in queryset:
                    data.append(CartSerializer(product).data)
                return Response(json.dumps(data), status=status.HTTP_200_OK)
            return Response({'Product Not Found': 'Invalid Product Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Session key paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        # productId = request.GET.get(self.lookup_url_kwarg)
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        session_key = self.request.session.session_key
        session = Session.objects.get(session_key=session_key)
        uid = session.get_decoded().get('_auth_user_id')
        # user = Customer.objects.get(pk=uid)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # guest_can_pause = serializer.data.get('guest_can_pause')
            # votes_to_skip = serializer.data.get('votes_to_skip')
            # host = self.request.session.session_key
            productId = serializer.data.get('productId')
            quantity = serializer.data.get('quantity')
            queryset = Cart.objects.filter(customer_id=uid, productId_id=productId)
            if queryset.exists():
                room = queryset[0]
                room.quantity = str(int(quantity) + int(room.quantity))
                room.save(update_fields=['quantity'])
                return Response(data=CartSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Cart(productId_id=productId,
                            customer_id=uid, quantity=quantity)
                room.save()
                return Response(data=CartSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'ProductId paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        productId = request.GET.get(self.lookup_url_kwarg)

        session_key = self.request.session.session_key
        session = Session.objects.get(session_key=session_key)
        uid = session.get_decoded().get('_auth_user_id')

        if productId != None:
            queryset = Cart.objects.filter(customer_id=uid, productId_id=productId)
            if queryset.exists():
                product = queryset[0];
                product.delete();
    #             # data['is_host'] = self.request.session.session_key == product[0].host
                return Response(data='Success', status=status.HTTP_200_OK)
            return Response({'Product Not Found': 'Invalid Product Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'ProductId paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
class OrderView(APIView):
    serializer_class = OrderSerializer
    lookup_url_kwarg = 'orderId'

    def get(self, request, format=None):
        orderId = request.GET.get(self.lookup_url_kwarg)

        session_key = self.request.session.session_key
        session = Session.objects.get(session_key=session_key)
        uid = session.get_decoded().get('_auth_user_id')

        if session:
            if orderId != None:
                queryset = Order.objects.filter(id=orderId)
                # productId = request.GET.get(self.lookup_url_kwarg)
                if queryset.exists():
                    data = CartSerializer(queryset[0]).data

                    return Response(data, status=status.HTTP_200_OK)
                return Response({'Product Not Found': 'Invalid Product Code.'}, status=status.HTTP_404_NOT_FOUND)

            querysetAll = Order.objects.filter(customer_id=uid)
            if querysetAll.exists():
                # data = CartSerializer(queryset[0]).data
                data = []
                for orderItem in querysetAll:
                    data.append(OrderSerializer(orderItem).data)
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Product Not Found': 'Invalid Product Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Session key paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        # productId = request.GET.get(self.lookup_url_kwarg)

        session_key = self.request.session.session_key
        session = Session.objects.get(session_key=session_key)
        uid = session.get_decoded().get('_auth_user_id')
        # user = Customer.objects.get(pk=uid)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():

            name = serializer.data.get('name')
            email = serializer.data.get('email')
            address = serializer.data.get('address')
            phoneNumber = serializer.data.get('phoneNumber')
            customer = serializer.data.get('customer')
            # date_order = serializer.data.get('date_order')
            state = serializer.data.get('state')
            note = serializer.data.get('note')
            products = serializer.data.get('products')
            total = serializer.data.get('total')

            # queryset = Cart.objects.filter(customer_id=uid, productId_id=productId)
            # if queryset.exists():
            #     room = queryset[0]
            #     room.quantity = str(int(quantity) + int(room.quantity))
            #     room.save(update_fields=['quantity'])
            #     return Response(data=CartSerializer(room).data, status=status.HTTP_200_OK)
            # else:
            room = Order(
                name = name,
                email = email,
                address = address,
                phoneNumber = phoneNumber,
                customer_id = uid,
                state = state,
                note = note,
                products = products,
                total = total,
            )
            room.save()
            Cart.objects.all().delete()
            return Response(data=CartSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'ProductId paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.