from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.shortcuts import render_to_response

from figure_coord.utils import json_response

from figure_coord.models import Challenge, Game


import json
import random

@csrf_exempt
@login_required #Написать параметр LOGIN_URL в настройках, чтобы знать куда переходить если что
def opponents (request):

    return render_to_response("opponents.html")



@csrf_exempt
@login_required
def get_opponents(request):
    """
    Function get AJAX request from Angular in JSON format
    and return response in format JSON with the list of possible opponents
    """

    if request.method != "POST":
        return HttpResponse("Request is not post")
    opponents = User.objects.all().exclude (id = request.user.id)
    opponents_r=[]
    for user in opponents:
        opponents_r.append(user.username)
    return json_response(opponents_r)


@csrf_exempt
@login_required
def send_challenge (requset):

    if requset.method !="POST":
        return  HttpResponse("Requset is not POST")

    sender = requset.user
    try:
        target = User.objects.get(username = requset.POST.get("target"))
    except User.DoesNotExist:
         return json_response({"status":"Target user does not exist"})


    if sender.username == target.username:
         return json_response({"status":"You cannot send challenge to yourself"})


    try:
        print (sender)
        Challenge.objects.get (sender = sender)

    except Challenge.DoesNotExist:
        Challenge.objects.create(sender = sender, target = target)

        return json_response({"status":"Ok"})

    return json_response({"status":"You have already send challenge"})


@csrf_exempt
@login_required
def get_challenge(request):

    if request.method != "POST":
        return HttpResponse ("Request is not POST")

    user = request.user

    try:
        print ("user")
        challenge = Challenge.objects.filter(target = user).order_by("timestamp")[0]

    except:
        return json_response({"user":user.username, "challenge_t":""})
    #challenge.delete()
    return json_response({"user":user.username,
                          "challenge_t":challenge.target.username,
                          "challenge_s":challenge.sender.username,
                          })


@csrf_exempt
@login_required
def check_answerd(request):

    if request.method != "POST":
        return HttpResponse("Request is not POST")

    try:
        game = Game.objects.get()


@csrf_exempt
@login_required
def answer_challenge(request):

    if request.method != "POST":
        return HttpResponse ("Request is not POST")

    user= request.user
    sender = User.objects.get(username = request.POST.get("sender"))
    operation = request.POST.get("operation")

    if operation == "accept":

        sides = [user,sender]
        random.shuffle(sides)

        challenge = Challenge.objects.get(sender = sender, target = user ).update(status = "a")

        Game.objects.create(w_player = sides[0],
                        b_player = sides[1],
                        status = "n",
                        )

        return json_response({"answerd":"accept"})


    if operation == "refuse":

        challenge = Challenge.objects.get(sender = sender, target = user ).update(status = "r")

        return json_response({"answerd":"refuse"})
