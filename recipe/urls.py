from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('home/', views.home, name="home"),
    path('signup/', views.signup, name="signup"),
    path('create/', views.create, name='create'),
    path("list/", views.list, name="list"),
    path("taglist/", views.taglist, name="taglist"),
    path('delete/<int:pk>', views.delete, name='delete'),
    path('recipe_page/', views.recipe_page, name='recipe_page'),
]