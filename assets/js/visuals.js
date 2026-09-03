/* ==========================================================================
   NM BAKERY — visuals.js
   Hand-built SVG artwork and icon set.
   Every illustration is generated from a product's `tone` colours so the
   whole catalogue looks like one designed system without needing photos.
   ========================================================================== */

(function () {
  'use strict';

  var CREAM = '#FBF4EA';
  var IVORY = '#FFFCF7';
  var GOLD  = '#C0983F';
  var ROSE  = '#BE6E85';
  var COCOA = '#4A2314';

  function tones(tone) {
    var t = tone || [];
    return { a: t[0] || '#C08A4E', b: t[1] || t[0] || '#8A5A2E' };
  }

  /* ------------------------------------------------------------------------
     Product artwork
     ------------------------------------------------------------------------ */
  var ART = {

    /* Layered celebration cake, cross-section */
    cake: function (tone) {
      var c = tones(tone);
      return '' +
        '<svg viewBox="0 0 200 176" role="img" aria-hidden="true">' +
          '<ellipse cx="100" cy="158" rx="74" ry="9" fill="' + COCOA + '" opacity=".12"/>' +
          '<rect x="30" y="146" width="140" height="7" rx="3.5" fill="' + IVORY + '" opacity=".9"/>' +
          /* bottom tier */
          '<path d="M36 146h128a4 4 0 0 0 4-4v-32H32v32a4 4 0 0 0 4 4z" fill="' + c.b + '"/>' +
          '<rect x="32" y="102" width="136" height="9" fill="' + CREAM + '"/>' +
          /* middle tier */
          '<rect x="32" y="72" width="136" height="30" fill="' + c.a + '"/>' +
          '<rect x="32" y="64" width="136" height="9" fill="' + CREAM + '"/>' +
          /* frosting cap with drips */
          '<path d="M32 64V50a10 10 0 0 1 10-10h116a10 10 0 0 1 10 10v14z" fill="' + IVORY + '"/>' +
          '<path d="M32 62c6 0 6 9 12 9s6-11 12-11 6 12 12 12 6-10 12-10 6 11 12 11 6-12 12-12 6 10 12 10 6-9 12-9 6 11 12 11 6-10 12-10v-9H32z" fill="' + IVORY + '"/>' +
          /* gold trim */
          '<rect x="32" y="100" width="136" height="2" fill="' + GOLD + '" opacity=".55"/>' +
          '<rect x="32" y="62" width="136" height="2" fill="' + GOLD + '" opacity=".55"/>' +
          /* swirls on top */
          '<circle cx="70" cy="40" r="9" fill="' + IVORY + '"/>' +
          '<circle cx="100" cy="35" r="11" fill="' + IVORY + '"/>' +
          '<circle cx="130" cy="40" r="9" fill="' + IVORY + '"/>' +
          '<circle cx="100" cy="22" r="6" fill="' + ROSE + '"/>' +
          '<path d="M100 16c0-4 5-6 6-10" stroke="' + GOLD + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '</svg>';
    },

    /* Bento cake in an open kraft box, three-quarter top view */
    bento: function (tone) {
      var c = tones(tone);
      return '' +
        '<svg viewBox="0 0 200 176" role="img" aria-hidden="true">' +
          '<ellipse cx="100" cy="158" rx="70" ry="9" fill="' + COCOA + '" opacity=".12"/>' +
          /* lid leaning behind */
          '<path d="M126 34h52a5 5 0 0 1 5 5v66a5 5 0 0 1-5 5h-52z" fill="#E7D6BC"/>' +
          '<path d="M126 34h52a5 5 0 0 1 5 5v10h-57z" fill="#D9C4A4"/>' +
          /* box */
          '<path d="M28 62h108a6 6 0 0 1 6 6v72a6 6 0 0 1-6 6H28a6 6 0 0 1-6-6V68a6 6 0 0 1 6-6z" fill="#EFE0C7"/>' +
          '<path d="M22 74h120v6H22z" fill="#DBC7A6" opacity=".7"/>' +
          /* cake, top view */
          '<circle cx="82" cy="104" r="40" fill="' + c.a + '"/>' +
          '<circle cx="82" cy="104" r="30" fill="' + c.b + '" opacity=".38"/>' +
          /* piped border — small pearls set inside the rim, not on it */
          '<g fill="' + IVORY + '" opacity=".95">' +
            '<circle cx="116" cy="104" r="3.2"/><circle cx="111.4" cy="87" r="3.2"/>' +
            '<circle cx="99" cy="74.6" r="3.2"/><circle cx="82" cy="70" r="3.2"/>' +
            '<circle cx="65" cy="74.6" r="3.2"/><circle cx="52.6" cy="87" r="3.2"/>' +
            '<circle cx="48" cy="104" r="3.2"/><circle cx="52.6" cy="121" r="3.2"/>' +
            '<circle cx="65" cy="133.4" r="3.2"/><circle cx="82" cy="138" r="3.2"/>' +
            '<circle cx="99" cy="133.4" r="3.2"/><circle cx="111.4" cy="121" r="3.2"/>' +
          '</g>' +
          /* piped heart */
          '<path d="M82 116c-9-7-15-11-15-17a7 7 0 0 1 13-4 7 7 0 0 1 13 4c0 6-6 10-11 17z" fill="' + IVORY + '"/>' +
          '<path d="M60 152h44" stroke="' + GOLD + '" stroke-width="2" stroke-linecap="round" opacity=".6"/>' +
        '</svg>';
    },

    /* Stack of brownie squares */
    brownie: function (tone) {
      var c = tones(tone);
      return '' +
        '<svg viewBox="0 0 200 176" role="img" aria-hidden="true">' +
          '<ellipse cx="100" cy="156" rx="72" ry="9" fill="' + COCOA + '" opacity=".14"/>' +
          /* bottom square */
          '<path d="M40 150h86a6 6 0 0 0 6-6v-28H34v28a6 6 0 0 0 6 6z" fill="' + c.b + '"/>' +
          '<rect x="34" y="108" width="98" height="10" rx="3" fill="' + c.a + '"/>' +
          /* middle square, offset */
          '<path d="M58 108h86a6 6 0 0 0 6-6V76H52v26a6 6 0 0 0 6 6z" fill="' + c.b + '"/>' +
          '<rect x="52" y="68" width="98" height="10" rx="3" fill="' + c.a + '"/>' +
          /* top square with crackled surface */
          '<path d="M46 68h86a6 6 0 0 0 6-6V38H40v24a6 6 0 0 0 6 6z" fill="' + c.b + '"/>' +
          '<rect x="40" y="30" width="98" height="10" rx="3" fill="' + c.a + '"/>' +
          '<path d="M52 35c8-3 14 2 22-1s12 3 20 0 14 2 22-2" stroke="' + IVORY + '" stroke-width="1.6" fill="none" opacity=".5" stroke-linecap="round"/>' +
          /* nut / chunk flecks */
          '<g fill="' + IVORY + '" opacity=".6">' +
            '<circle cx="66" cy="52" r="3.4"/><circle cx="98" cy="58" r="2.8"/><circle cx="120" cy="48" r="3.2"/>' +
            '<circle cx="76" cy="92" r="3"/><circle cx="112" cy="96" r="2.6"/>' +
            '<circle cx="60" cy="132" r="3"/><circle cx="104" cy="136" r="2.8"/>' +
          '</g>' +
          '<path d="M40 30h98" stroke="' + GOLD + '" stroke-width="1.6" opacity=".5"/>' +
        '</svg>';
    },

    /* Cookie with chocolate chips */
    cookie: function (tone) {
      var c = tones(tone);
      return '' +
        '<svg viewBox="0 0 200 176" role="img" aria-hidden="true">' +
          '<ellipse cx="100" cy="152" rx="66" ry="9" fill="' + COCOA + '" opacity=".13"/>' +
          /* back cookie */
          '<circle cx="134" cy="92" r="42" fill="' + c.b + '" opacity=".55"/>' +
          /* main cookie with soft irregular edge */
          '<path d="M100 26c14 0 22 8 32 12s21 2 26 14-2 20 0 31-9 20-19 26-16 15-29 15-22-9-34-11-24-4-29-15 2-20 0-31 6-21 16-27 23-14 37-14z" fill="' + c.a + '"/>' +
          '<path d="M100 26c14 0 22 8 32 12s21 2 26 14-2 20 0 31-9 20-19 26-16 15-29 15" fill="' + IVORY + '" opacity=".14"/>' +
          /* chips */
          '<g fill="' + COCOA + '">' +
            '<circle cx="82" cy="62" r="7"/><circle cx="118" cy="72" r="6"/>' +
            '<circle cx="70" cy="98" r="6.5"/><circle cx="104" cy="104" r="7.5"/>' +
            '<circle cx="132" cy="104" r="5"/><circle cx="88" cy="132" r="6"/>' +
            '<circle cx="118" cy="132" r="4.5"/><circle cx="56" cy="76" r="4"/>' +
          '</g>' +
          '<g fill="' + IVORY + '" opacity=".35">' +
            '<circle cx="80" cy="60" r="2"/><circle cx="102" cy="102" r="2.2"/><circle cx="68" cy="96" r="1.8"/>' +
          '</g>' +
        '</svg>';
    },

    /* Tea-cake loaf with cut slices */
    loaf: function (tone) {
      var c = tones(tone);
      return '' +
        '<svg viewBox="0 0 200 176" role="img" aria-hidden="true">' +
          '<ellipse cx="100" cy="152" rx="74" ry="9" fill="' + COCOA + '" opacity=".13"/>' +
          /* board */
          '<path d="M24 138h152a6 6 0 0 1 0 12H24a6 6 0 0 1 0-12z" fill="#D9BE96"/>' +
          /* loaf body */
          '<path d="M74 138h84c8 0 12-5 12-12V74c0-14-10-24-24-24H86C72 50 62 60 62 74v52c0 7 4 12 12 12z" fill="' + c.a + '"/>' +
          '<path d="M62 78c14-8 24 6 38-2s26 6 40-2 18 4 28 0" stroke="' + c.b + '" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>' +
          /* leaning slices */
          '<path d="M30 138h30c5 0 8-3 8-8V86c0-9-7-16-16-16s-16 7-16 16v44c0 5-3 8-6 8z" fill="' + c.a + '" opacity=".92"/>' +
          '<path d="M36 92c8-4 14 4 22 0" stroke="' + c.b + '" stroke-width="3.4" fill="none" opacity=".55" stroke-linecap="round"/>' +
          /* crumb flecks */
          '<g fill="' + c.b + '" opacity=".55">' +
            '<circle cx="92" cy="100" r="3"/><circle cx="118" cy="112" r="2.6"/><circle cx="140" cy="96" r="2.8"/>' +
            '<circle cx="106" cy="124" r="2.4"/><circle cx="46" cy="112" r="2.4"/>' +
          '</g>' +
          '<path d="M62 74c0-14 10-24 24-24h60" stroke="' + GOLD + '" stroke-width="2" fill="none" opacity=".5"/>' +
        '</svg>';
    },

    /* Large showpiece cake for the hero stage */
    hero: function () {
      return '' +
        '<svg viewBox="0 0 260 300" role="img" aria-label="Illustration of a two-tier celebration cake">' +
          '<defs>' +
            '<linearGradient id="nmSponge" x1="0" y1="0" x2="0" y2="1">' +
              '<stop offset="0" stop-color="#7A4B2E"/><stop offset="1" stop-color="#4A2314"/>' +
            '</linearGradient>' +
            '<linearGradient id="nmCream" x1="0" y1="0" x2="1" y2="1">' +
              '<stop offset="0" stop-color="#FFFCF7"/><stop offset="1" stop-color="#F0DFC6"/>' +
            '</linearGradient>' +
            '<linearGradient id="nmGold" x1="0" y1="0" x2="1" y2="0">' +
              '<stop offset="0" stop-color="#A9734B"/><stop offset=".5" stop-color="#E3C783"/><stop offset="1" stop-color="#A9734B"/>' +
            '</linearGradient>' +
          '</defs>' +
          /* stand */
          '<ellipse cx="130" cy="284" rx="92" ry="12" fill="#2A1408" opacity=".14"/>' +
          '<path d="M110 250h40v22c0 4 8 5 18 7v5H92v-5c10-2 18-3 18-7z" fill="url(#nmGold)" opacity=".9"/>' +
          '<ellipse cx="130" cy="250" rx="86" ry="14" fill="url(#nmCream)"/>' +
          '<ellipse cx="130" cy="248" rx="86" ry="12" fill="#FFFCF7"/>' +
          /* bottom tier */
          '<path d="M56 176h148v62c0 8-33 14-74 14s-74-6-74-14z" fill="url(#nmSponge)"/>' +
          '<path d="M56 176c0-8 33-14 74-14s74 6 74 14-33 14-74 14-74-6-74-14z" fill="#8A5A34"/>' +
          /* cream drip over bottom tier */
          '<path d="M56 178c0 10 5 8 8 18s10 4 12 16 12 2 14 12 13 0 16 10 12-2 16 8 12-4 14 6 11-6 13 4 12-8 13 2 10-10 11 0 8-12 9-4c2-14 4-16 4-26v-38c0-8-33-14-74-14s-74 6-74 14z" fill="url(#nmCream)"/>' +
          '<ellipse cx="130" cy="176" rx="74" ry="14" fill="#FFFCF7"/>' +
          /* gold band */
          '<path d="M60 214c18 7 44 10 70 10s52-3 70-10" stroke="url(#nmGold)" stroke-width="3" fill="none" opacity=".85"/>' +
          /* top tier */
          '<path d="M86 116h88v50c0 6-24 10-44 10s-44-4-44-10z" fill="url(#nmSponge)"/>' +
          '<path d="M86 116c0-6 24-10 44-10s44 4 44 10-24 10-44 10-44-4-44-10z" fill="#8A5A34"/>' +
          '<path d="M86 118c0 8 5 6 7 14s9 3 11 11 10 2 13 9 10-2 13 6 10-3 12 4 9-5 11 2 9-6 10 1 8-8 9-2c1-9 2-11 2-17v-28c0-6-24-10-44-10s-44 4-44 10z" fill="url(#nmCream)"/>' +
          '<ellipse cx="130" cy="116" rx="44" ry="10" fill="#FFFCF7"/>' +
          /* piped rosettes on top */
          '<circle cx="106" cy="110" r="9" fill="#FFFCF7"/>' +
          '<circle cx="130" cy="106" r="11" fill="#FFFCF7"/>' +
          '<circle cx="154" cy="110" r="9" fill="#FFFCF7"/>' +
          '<circle cx="118" cy="112" r="4" fill="#EBC4CA"/>' +
          '<circle cx="144" cy="112" r="4" fill="#EBC4CA"/>' +
          /* cherry + sprig */
          '<circle cx="130" cy="88" r="9" fill="#BE6E85"/>' +
          '<circle cx="127" cy="85" r="3" fill="#FFFCF7" opacity=".55"/>' +
          '<path d="M130 79c1-8 8-11 10-18" stroke="#7A4B2E" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
          /* candles */
          '<rect x="97" y="60" width="5" height="26" rx="2.5" fill="url(#nmGold)"/>' +
          '<rect x="158" y="60" width="5" height="26" rx="2.5" fill="url(#nmGold)"/>' +
          '<path d="M99.5 58c4-5 0-7 0-11 4 3 6 6 6 9a3.2 3.2 0 0 1-6 2z" fill="#E3C783"/>' +
          '<path d="M160.5 58c4-5 0-7 0-11 4 3 6 6 6 9a3.2 3.2 0 0 1-6 2z" fill="#E3C783"/>' +
          /* falling sprinkles */
          '<g opacity=".8">' +
            '<rect x="52" y="70" width="3" height="9" rx="1.5" fill="#BE6E85" transform="rotate(28 52 70)"/>' +
            '<rect x="204" y="98" width="3" height="9" rx="1.5" fill="#C0983F" transform="rotate(-34 204 98)"/>' +
            '<rect x="40" y="130" width="3" height="9" rx="1.5" fill="#C0983F" transform="rotate(46 40 130)"/>' +
            '<rect x="214" y="160" width="3" height="9" rx="1.5" fill="#BE6E85" transform="rotate(-18 214 160)"/>' +
          '</g>' +
        '</svg>';
    },

    /* ---- Process story line art ---- */
    chat: function () {
      return lineArt('<path d="M14 46V22a8 8 0 0 1 8-8h44a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8H32L14 64z"/>' +
        '<path d="M30 28h28M30 38h18"/>' +
        '<circle cx="70" cy="62" r="10"/><path d="M66 62l3 3 6-6"/>');
    },
    bowl: function () {
      return lineArt('<path d="M12 38h64a4 4 0 0 1 4 4c0 16-13 28-30 28h-12C21 70 8 58 8 42a4 4 0 0 1 4-4z"/>' +
        '<path d="M30 38c0-10 6-14 14-14M52 38c0-6 4-9 9-9"/>' +
        '<path d="M58 14l10 16M64 10l8 12"/>');
    },
    oven: function () {
      return lineArt('<rect x="10" y="14" width="68" height="60" rx="8"/>' +
        '<rect x="20" y="34" width="48" height="30" rx="5"/>' +
        '<path d="M20 24h20M58 24h8"/>' +
        '<path d="M34 56c0-8 10-8 10-16 6 5 8 9 8 14a9 9 0 0 1-18 2z"/>');
    },
    box: function () {
      return lineArt('<path d="M12 30l32-16 32 16-32 16z"/>' +
        '<path d="M12 30v32l32 16V46zM76 30v32L44 78V46z"/>' +
        '<path d="M44 46v32M28 22l32 16"/>');
    },

    /* Custom-order artwork for the home panel */
    custom: function () {
      return '' +
        '<svg viewBox="0 0 240 200" role="img" aria-hidden="true">' +
          '<ellipse cx="120" cy="182" rx="82" ry="10" fill="#2A1408" opacity=".12"/>' +
          '<path d="M60 178h120a8 8 0 0 0 8-8v-52H52v52a8 8 0 0 0 8 8z" fill="#4A2314"/>' +
          '<path d="M52 118c0-10 30-18 68-18s68 8 68 18-30 18-68 18-68-8-68-18z" fill="#8A5A34"/>' +
          '<path d="M52 120c0 12 6 8 9 20s11 4 14 16 14 2 17 12 13-2 17 8 13-6 15 4 12-8 14 2 11-10 12 0c2-12 3-14 3-24v-38c0-10-30-18-68-18s-68 8-68 18z" fill="#FFFCF7"/>' +
          '<ellipse cx="120" cy="118" rx="68" ry="18" fill="#FFFCF7"/>' +
          /* piped message plaque */
          '<rect x="82" y="102" width="76" height="26" rx="13" fill="#EBC4CA"/>' +
          '<path d="M96 115h20M96 121h34" stroke="#4A2314" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>' +
          /* piping bag */
          '<path d="M172 26l30 14-16 30-24-20z" fill="#F5E7D6" stroke="#C0983F" stroke-width="2"/>' +
          '<path d="M162 50l-14 16 8 8 16-14z" fill="#C0983F"/>' +
          '<path d="M150 76c-8 8-6 14 0 16" stroke="#FFFCF7" stroke-width="5" fill="none" stroke-linecap="round"/>' +
          /* sprinkles */
          '<g opacity=".85">' +
            '<rect x="44" y="46" width="4" height="11" rx="2" fill="#BE6E85" transform="rotate(24 44 46)"/>' +
            '<rect x="70" y="24" width="4" height="11" rx="2" fill="#C0983F" transform="rotate(-30 70 24)"/>' +
            '<rect x="30" y="82" width="4" height="11" rx="2" fill="#C0983F" transform="rotate(52 30 82)"/>' +
          '</g>' +
        '</svg>';
    }
  };

  function lineArt(inner) {
    return '<svg viewBox="0 0 88 88" fill="none" stroke="#A9734B" stroke-width="2.4" ' +
      'stroke-linecap="round" stroke-linejoin="round" role="img" aria-hidden="true">' + inner + '</svg>';
  }

  /* ------------------------------------------------------------------------
     Icon set — 24×24 stroke icons
     ------------------------------------------------------------------------ */
  function icon(inner, fill) {
    return '<svg viewBox="0 0 24 24" fill="' + (fill || 'none') + '" stroke="currentColor" ' +
      'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  }

  var ICONS = {
    sparkle: icon('<path d="M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6z"/><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),
    wheat:   icon('<path d="M12 21V9"/><path d="M12 12c-3 0-5-2-5-5 3 0 5 2 5 5zM12 12c3 0 5-2 5-5-3 0-5 2-5 5zM12 18c-3 0-5-2-5-5 3 0 5 2 5 5zM12 18c3 0 5-2 5-5-3 0-5 2-5 5z"/>'),
    leaf:    icon('<path d="M4 20c0-9 5-14 16-15 0 11-5 16-13 16H4z"/><path d="M9 15c2-3 4-4.5 7-6"/>'),
    shield:  icon('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
    heart:   icon('<path d="M12 20s-7-4.4-7-9.2A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7 2.8C19 15.6 12 20 12 20z"/>'),
    gift:    icon('<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12"/><path d="M12 9S9.5 3 7.5 4.5 9 9 12 9zM12 9s2.5-6 4.5-4.5S15 9 12 9z"/>'),
    check:   icon('<path d="M5 12.5l4.5 4.5L19 7"/>'),
    star:    icon('<path d="M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6L12 17.3 6.7 20.1l1.1-6L3.4 9.9l6-.8z"/>', 'currentColor'),
    phone:   icon('<path d="M6 3h3l2 5-2.2 1.4a12 12 0 0 0 5.8 5.8L16 13l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3z"/>'),
    mail:    icon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>'),
    pin:     icon('<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>'),
    clock:   icon('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>'),
    search:  icon('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
    bag:     icon('<path d="M5 8h14l-1.2 11.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
    arrow:   icon('<path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5"/>'),
    chevron: icon('<path d="M9 5.5l6.5 6.5L9 18.5"/>'),
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.43 1.32 4.92L2.1 22l5.38-1.4a9.8 9.8 0 0 0 4.56 1.14h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.77 9.77 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1.81.83-3.03-.2-.31a8.13 8.13 0 0 1-1.25-4.33c0-4.51 3.68-8.18 8.2-8.18 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.4 5.79c0 4.51-3.68 8.17-8.2 8.17zm4.5-6.12c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.56.12-.16.25-.63.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.1-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.6.18 1.14.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.47-.28z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.4"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.5 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8.6v3h2.5V21h3.4v-8.5h2.5l.4-3z"/></svg>'
  };

  /* ------------------------------------------------------------------------
     Public helpers
     ------------------------------------------------------------------------ */
  window.NM_ART = {

    /** Artwork for a product, chosen from its category. */
    forProduct: function (product) {
      var map = {
        cakes: 'cake', bento: 'bento', brownies: 'brownie',
        cookies: 'cookie', teacakes: 'loaf'
      };
      var fn = ART[map[product.category] || 'cake'];
      return fn(product.tone);
    },

    /** Artwork by explicit name. */
    get: function (name, tone) {
      var fn = ART[name];
      return fn ? fn(tone) : '';
    },

    /** A rich gradient background matching a product's tone. */
    toneBackground: function (tone) {
      var c = tones(tone);
      // saturated enough to carry the flavour — a pale wash made the whole
      // catalogue read as one dull beige block
      return 'radial-gradient(110% 100% at 26% 16%, ' + hexToRgba(c.a, .52) + ' 0%, transparent 66%),' +
             'linear-gradient(150deg, #F2E2C8 0%, ' + hexToRgba(c.b, .48) + ' 100%)';
    },

    icon: function (name) { return ICONS[name] || ''; },

    icons: ICONS
  };

  function hexToRgba(hex, alpha) {
    var h = String(hex).replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')';
  }
})();
