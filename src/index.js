require('!style!css!stylus!./style.styl');
import m from 'mithril';
import yaml from 'js-yaml';
import toml from 'toml';

const sources = {
  json: JSON.parse,
  toml: toml.parse,
  yaml: yaml.safeLoad,
};

const dests = {
  'json-compact': JSON.stringify,
  json: (data) => JSON.stringify(data, null, 2),
  yaml: yaml.safeDump,
};

const conversions = [];
Object.keys(sources).sort().forEach((src) => {
  Object.keys(dests).sort().forEach((dest) => {
    conversions.push(`${src}:${dest}`);
  });
});


function view(c) {
  return m('table', m('tbody', [
    m('tr', [
      m('td', [
        m('textarea', {
          value: c.src(),
          oninput: m.withAttr('value', c.transmogrify),
        }),
        m('select', {
          value: c.conv(),
          onchange: function onchange() {
            c.conv(this.value);
            c.transmogrify();
          },
        },
          conversions.map((conv) => m('option', { value: conv }, conv))
        ),
      ]),
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
  c.conv = m.prop('yaml:json');
  c.error = m.prop(null);

  c.transmogrify = function transmogrify(newSrc) {
    if (newSrc !== undefined) {
      c.src(newSrc);
    }
    try {
      const [srcConv, dstConv] = c.conv().split(':');
      c.error(null);
      const data = sources[srcConv](c.src());
      c.out(dests[dstConv](data));
    } catch (e) {
      c.error(`${e}`);
    }
  };
}

m.mount(document.body, { controller, view });
