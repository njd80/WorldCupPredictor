predictor = {

  dom: {
    mainContainer: '#mainContainer',
    groups: '#mainContainer .group',
    log: '#log'
  },

  events: {

  },

  init: function() {
    var parent = this;
    $.getJSON("data/groups.json", function(d) {

      //temp display json
      $(parent.dom.log).html(JSON.stringify(d));

      //Iterate Groups
      $.each(d, function(i, group) {
        parent.renderGroupContainer(i, group);
        parent.renderTeams(i, group.teams);
      });
    });
  },

  renderGroupContainer: function(index,group) {
    var template = [
      '<div class="group" id="'+index+'">',
      ' <p class="name">'+group.name+'</p>',
      ' <div class="teams"></div',
      '</div>'
    ].join("\n");
    $(this.dom.mainContainer).append(template);
  },

  renderTeams: function(group,teams) {
    var teamsContainer = $(this.dom.groups).filter('#'+group).find('.teams');
    $.each(teams, function(i, team) {
      var template = '<img src="img/'+team.short_name+'.png"/><p class="team" id="'+i+'">'+team.name+'</p>';
      teamsContainer.append(template);
    });
  },

  renderFixtures: function(group) {
    console.log(group);
  }

};

$(document).ready(function () {
    predictor.init();
});
