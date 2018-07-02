function getSlackSidebarDiv() {
  return document.getElementsByClassName('p-channel_sidebar__static_list')[0];
}

function applySortable() {
  var sidebar_div = getSlackSidebarDiv();
  var sortable = Sortable.create(sidebar_div, {
    group: 'slack_sidebar_order',
    store: {
      get: function(sortable) {
  			var order = localStorage.getItem(sortable.options.group.name);
  			return order ? order.split('|') : [];
      },
      set: function(sortable) {
  			var order = sortable.toArray();
  			localStorage.setItem(sortable.options.group.name, order.join('|'));
      }
    }
  });

  // 位置を変えた場合、クリック時のスクロール位置がおかしくなるので、
  // 正しい位置にスクロールさせる処理を仕込む
  sidebar_elms = sidebar_div.children;
  for (var i = 0; i < sidebar_elms.length; ++i) {
    sidebar_elms[i].onclick = function() {
      var elm = this;
      setTimeout(function() {
        elm.scrollIntoViewIfNeeded(true);
      }, 1000);
    }
  }
}

window.onload = setTimeout(applySortable, 5000);
