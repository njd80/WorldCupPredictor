predictor = {

  dom: {
    mainContainer: '#mainContainer',
    groups: '#mainContainer .group',
    log: '#log'
  },

  events: {
    clickEvents: function() {
      $('#mainContainer').on('click', '.fixturesLabel', function() {
        console.log('fixturesLabel');
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
      ' <p class="fixturesLabel">Fixtures',
      '   <span class="fixturesExpandLabel">+</span>',
      ' </p>',
      ' <div class="fixtures"></div>',
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
    //1v2
    //3v4
    //1v3
    //4v2
    //2v3
    //4v1
  }

};

$(document).ready(function () {
    predictor.init();
});
