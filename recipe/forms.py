from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db.models import query
from .models import MyUser, Recipe, Tag

class SignupForm(UserCreationForm):
    email = forms.EmailField()
    user_name = forms.CharField()

    class Meta:
        model = MyUser
        fields = ('email', 'user_name', 'password1', 'password2')

class RecipeForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(queryset=Tag.objects.all(),
                                          widget=forms.CheckboxSelectMultiple
    )

    class Meta:
        model = Recipe
        fields = ('title', 'tags')