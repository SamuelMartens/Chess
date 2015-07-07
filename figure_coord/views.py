from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.shortcuts import render_to_response

from figure_coord.utils import json_response


import json


@csrf_exempt
@login_required #Написать параметр LOGIN_URL в настройках, чтобы знать куда перезодить если что
def opponents (request):
    """
    Function get AJAX request from Angular in JSON format
    and return response in format JSON with the list of possible opponents
    """

    return render_to_response("opponents.html")



@csrf_exempt
def get_opponents(request):
    print ("GOT request")
    if request.method != "POST":
        return HttpResponse("Request is not post")

    message = request.POST.get("data")
    print (message)
    opponents = User.objects.all().exclude (id = request.user.id)
    print (opponents)
    opponents_r=[]
    for user in opponents:
        opponents_r.append(user.username)
    return json_response(opponents_r)




