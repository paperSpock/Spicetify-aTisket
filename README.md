# Spicetify-aTisket
![aTisket Button](https://github.com/paperSpock/spicetify-aTisket/raw/master/aTisket-screenshot1.png)

An extension for [spicetify-cli](https://github.com/khanhas/spicetify-cli) which adds a button to release pages to launch an instance of https://etc.marlonob.info/atisket/ for submission to [MusicBrainz](https://musicbrainz.org/)

### Why?
Inspired by a [userscript](https://github.com/atj/userscripts/blob/master/spotify_atisket_link.user.js) by [atj](https://github.com/atj), I decided a Spicetify extension would be more useful to me than opening up the Spotify web interface or just pasting a link into aTisket.

I do most of my music listening on Spotify. If I'm not listening to Spotify, I'm listening to my MP3 player, the library for which I manage with [beets](https://github.com/beetbox/beets). Beets uses the [MusicBrainz](https://musicbrainz.org/) database as its main source of metadata, and most things I listen to on Spotify (which are generally then only available from purchase on iTunes or, more rarely, Bandcamp) haven't been added to MusicBrainz when I go to add them to my library after purchase.  Since aTisket also includes links to iTunes releases, (and there are other userscripts for adding Bandcamp releases to MusicBrainz) this makes it super easy to add to MusicBrainz and maintain my ideal, perfectly-formatted music library.

## Requirements
- Make sure you have [installed spicetify-cli](https://github.com/khanhas/spicetify-cli/wiki/Installation) and [generated a config](https://github.com/khanhas/spicetify-cli/wiki/Basic-Usage)

## Installation
- Download [aTisket.js](https://github.com/paperSpock/spicetify-aTisket/raw/master/aTisket.js)
- Copy/move the file to any of the following:
  - `Extensions` folder in Home directory:
    - Windows: `%userprofile%\.spicetify\Extensions\`
    - Linux: `$XDG_CONFIG_HOME/.config/spicetify/Extensions/ or ~/.config/spicetify/Extensions`
    - MacOS: `~/spicetify_data/Extensions`
  - `Extensions` folder in Spicetify executable directory.
- Run command: `spicetify config extensions aTisket.js` (Adds aTisket.js to the config)
- Apply using either of the commands:
  - `spicetify backup apply`
  or
  - `spicetify apply`

## Usage
Click the aTisket button on any release page.

![aTisket Screenshot](https://github.com/paperSpock/spicetify-aTisket/raw/master/aTisket-screenshot2.png)

### Make sure to read the MusicBrainz **[Beginners Guide](https://musicbrainz.org/doc/Beginners_Guide)** before making any submissions. 

### Refer to the **[Style Guidelines](https://musicbrainz.org/doc/Style)** or **[MetaBrainz forum](https://community.metabrainz.org/)** with any additional questions about submitting to MusicBrainz.

## License

The icon used is from Google's [Material Design Icons](https://github.com/google/material-design-icons) icon set. The icon itself can be found [here](https://github.com/google/material-design-icons/blob/master/src/action/shopping_basket/materialiconsoutlined/24px.svg).

This code is licensed under [GPL-3.0](https://github.com/paperSpock/Spicetify-aTisket/blob/master/LICENSE)