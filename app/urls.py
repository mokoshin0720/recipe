#from django.conf.urls import url
from django.urls import path
from . import views

app_name = 'test0_app'
urlpatterns = [
   path('', views.index, name='index'),
   path('test1/', views.test1, name="test1"),
]