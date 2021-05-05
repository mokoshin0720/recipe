# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render

# Create your views here.
def index(request):
   mydict = {
      'insert_something':"これはお肉",
      'date':"2021/05/05"
   }
   return render(request, 'test0_app/index.html', mydict)

def test1(request):
   return render(request, 'test1_app/test1.html')