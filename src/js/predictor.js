predictor = {

  dom: {
    mainContainer: '#mainContainer',
    groups: '#mainContainer .group',
    log: '#log'
  },

  events: {
    clickEvents: function() {
      //Fixtures Label
      $('#mainContainer').on('click', '.fixturesLabel', function() {
        var fixtures = $(this).parent('.fixtures');
        if (fixtures.data('open')) {
          fixtures.removeClass('open').data('open',false);
        } else {
          fixtures.addClass('open').data('open',true);
        }
			});
    }
  },

  init: function() {
    var parent = this;
    $.getJSON("data/groups.json", function(d) {

      //Iterate Groups
      $.each(d, function(i, group) {
        parent.renderGroupContainer(i, group);
        parent.renderTeams(i, group.teams);
        parent.renderFixtures(i, group.teams);
      });
    });

    //Add click events
		parent.events.clickEvents();
  },

  renderGroupContainer: function(index,group) {
    var template = [
      '<div class="group" id="'+index+'">',
      ' <p class="name">'+group.name+'</p>',
      ' <div class="teams"></div>',
      ' <div class="fixtures">',
      '   <p class="fixturesLabel">Fixtures',
      '     <span class="expandLabel">+</span>',
      '     <span class="contractLabel">-</span>',
      '   </p>',
      ' </div>',
      '</div>'
    ].join("\n");
    $(this.dom.mainContainer).append(template);
  },

  renderTeams: function(group,teams) {
    var teamsContainer = $(this.dom.groups).filter('#'+group).find('.teams');
    $.each(teams, function(i, team) {
      var template = [
        '<p class="team" id="'+i+'">',
        ' <img class="flag" src="img/'+team.short_name+'.png"/>',
        ' <span class="team_name">'+team.name+'</span>',
        '</p>'
      ].join("\n");
      teamsContainer.append(template);
    });
  },

  renderFixtures: function(group,teams) {
    var fixturesContainer = $(this.dom.groups).filter('#'+group).find('.fixtures');
    var template = [
      '<p class="fixture">'+teams['1'].name+'Vs'+teams['2'].name+'</p>',
      '<p class="fixture">'+teams['3'].name+'Vs'+teams['4'].name+'</p>',
      '<p class="fixture">'+teams['1'].name+'Vs'+teams['3'].name+'</p>',
      '<p class="fixture">'+teams['4'].name+'Vs'+teams['2'].name+'</p>',
      '<p class="fixture">'+teams['2'].name+'Vs'+teams['3'].name+'</p>',
      '<p class="fixture">'+teams['4'].name+'Vs'+teams['1'].name+'</p>'
    ].join("\n");
    fixturesContainer.append(template);
  }

};

$(document).ready(function () {
    predictor.init();
});
