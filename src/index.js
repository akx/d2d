require('!style!css!stylus!./style.styl');
import m from 'mithril';
import yaml from 'js-yaml';


function view(c) {
  return m('table', m('tbody', [
    m('tr', [
      m('td', m('textarea', { value: c.src(), oninput: m.withAttr('value', c.transmogrify) })),
      m('td', [
        m('textarea', { readonly: true, value: c.out() }),
        m('input', { value: c.error() || '(no error)' }),
      ]),
    ]),
  ]));
}

function controller() {
  const c = this;
  c.src = m.prop('');
  c.out = m.prop('');
  c.error = m.prop(null);
  c.transmogrify = function transmogrify(newSrc) {
    c.src(newSrc);
    try {
      c.error(null);
      const data = yaml.safeLoad(newSrc);
      c.out(JSON.stringify(data, null, 2));
    } catch (e) {
      c.error(`${e}`);
    }
  };
}

m.mount(document.body, { controller, view });
