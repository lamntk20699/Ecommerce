from rest_framework import serializers

from .models import Cart, Customer, Order, Product


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'user', 'name', 'email', 'phoneNumber', 'address')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'user', 'name', 'email', 'phoneNumber', 'address')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'user', 'name', 'email', 'phoneNumber', 'address')
        exclude = ('user', 'email')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'productName',
            'productImage',
            'productOldPrice',
            'productPrice',
            'productSale',
            'productDescription',
            'productCategory',
            'productCountInStock',
            'productRating',
            'productNumReviews',
        )

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ( 'id', 'productId', 'quantity' )

class OrderSerializer(serializers.ModelSerializer):
  class Meta:
      model = Order
      fields = (
          'id',
          'name',
          'email',
          'address',
          'phoneNumber',
          'customer',
          'date_order',
          'state',
          'note',
          'products',
          'total'
        )