from django.conf.urls import patterns, include, url

urlpatterns = patterns("figure_coord.views",
                       #url (r"^game/(?P<thread_id>\d+)/$", "game_view"),
                       url (r"^opponents/$", "opponents"),
                       url(r"^get_opponents/$", "get_opponents"),

                       url(r"^challenge/send/$", "send_challenge"),
                       url(r"^challenge/get/$", "get_challenge"),
                       url(r"^challenge/check_answerd/$", "check_answerd"),
                       url(r"^challenge/answerd_challenge/$", "answerd_challenge"),

                       url(r"^game/$", "init_game" , name="game"),
                       )
