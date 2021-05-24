from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import MyUser, Recipe

class SignupForm(UserCreationForm):
    email = forms.EmailField(

    )

    user_name = forms.CharField(

    )

    class Meta:
        model = MyUser
        fields = ('email', 'user_name', 'password1', 'password2')

class RecipeForm(forms.ModelForm):

    class Meta:
        model = Recipe
        fields = ('title',)