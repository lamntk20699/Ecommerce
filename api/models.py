import random
import string

from django.contrib.auth.models import User
from django.db import models


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(code=code).count() == 0:
            break

    return code

def generate_unique_product_code():
    length = 10

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=False)
    name = models.CharField(max_length=200, null=False)
    email = models.CharField(max_length=200, null=True)
    phoneNumber = models.CharField(max_length=10, null=True, default='')
    address = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    # code = models.CharField(max_length=8, default=generate_unique_product_code, unique=True)
    productName = models.CharField(max_length=200, unique=True)
    productImage = models.CharField(max_length=200, unique=False)
    productOldPrice = models.IntegerField(null=False, default=1)
    productPrice = models.IntegerField(null=False, default=1)
    productSale = models.IntegerField(null=False, default=0)
    productDescription = models.CharField(max_length=2000, unique=False)
    productCategory = models.IntegerField(null=False, default=0)
    productCountInStock = models.CharField(max_length=2000, unique=False)
    productRating = models.IntegerField(null=False, default=0)
    productNumReviews = models.IntegerField(null=False, default=0)

    def __str__(self):
        return self.productName

class Cart(models.Model):
    # code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    productId = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.IntegerField(null=False, default=0)

class Order(models.Model):
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    address = models.CharField(max_length=200, null=True)
    phoneNumber = models.CharField(max_length=10, null=True, default='')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    date_order = models.DateTimeField(auto_now_add=True)
    state = models.CharField(max_length=200, null=True)
    note = models.CharField(max_length=200, null=True)
    products = models.CharField(max_length=2000, null=True)
    total = models.IntegerField(null=False, default=0)

    def __str__(self):
        return self.name
