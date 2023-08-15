from django.http import HttpResponseRedirect
from django.shortcuts import render

from .forms import RegistrationForm


# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def register(request):
    form = RegistrationForm()
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/login')
    return render(request, 'frontend/register.html', {'form': form})