from django.contrib.auth import views as auth_views
from django.urls import path

from .views import index, register

urlpatterns = [
    path('', index),
    path('login', auth_views.LoginView.as_view(template_name='frontend/login.html'), name='login'),
    path('logout', auth_views.LogoutView.as_view(next_page="/"), name='logout'),
    path('register/', register, name="register"),
    path('product', index),
    path('product/<str:pk>', index),
    path('cart', index),
    path('profile', index),
    path('user/order', index),
    path('user/order/<str:pk>', index),
    path('user/payment', index),
    path('login123', index),
    path('signup123', index),
]
