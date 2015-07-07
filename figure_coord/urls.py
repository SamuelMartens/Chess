from django.conf.urls import patterns, include, url

urlpatterns = patterns("figure_coord.views",
                       #url (r"^game/(?P<thread_id>\d+)/$", "game_view"),
                      # url (r"^send_chellenge/$", "send_chellenge"),
                       url (r"^opponents/$", "opponents"),
                       url(r"^get_opponents/$", "get_opponents")
                       )
