from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login
from .forms import SignupForm

# Create your views here.
def index(request):
    user = request.user
    return render(request, 'index.html', {'user': user})

def signup(request):
    if request.method == "POST":
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(email=email, password=raw_password)
            login(request, user)
            return redirect('index')
    else:
        form = SignupForm()
    return render(request, 'signup.html', {"form": form})