from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.forms import widgets
from .models import MyUser, Recipe, Tag

class SignupForm(UserCreationForm):
    email = forms.EmailField()
    user_name = forms.CharField()

    class Meta:
        model = MyUser
        fields = ('email', 'user_name', 'password1', 'password2')

class RecipeForm(forms.ModelForm):
    title = forms.CharField(max_length=20,
                            required=True)
    tags = forms.ModelMultipleChoiceField(queryset=Tag.objects.all(),
                                          widget=forms.CheckboxSelectMultiple,
    )

    class Meta:
        model = Recipe
        fields = ('title', 'tags')

class TagSearchForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(queryset=Tag.objects.all(),
                                          widget=forms.CheckboxSelectMultiple,
                                          )

    class Meta:
        model = Recipe
        fields = ('tags',)