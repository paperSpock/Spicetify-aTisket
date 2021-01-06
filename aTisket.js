// @ts-check

// NAME: Atisket
// AUTHOR: paperSpock
// DESCRIPTION: Add button to every release page to open with A-Tisket https://etc.marlonob.info/atisket/.

/// <reference path="../globals.d.ts" />

(function aTisket() {
    if (!Spicetify.URI) {
        setTimeout(aTisket, 1000);
        return;
    }
    const ATISKET_ICON =
    `<svg width="16" height="16" version="1.1" viewBox="0 0 24 24" transform="translate(0,2)" xmlns="http://www.w3.org/2000/svg"><path d="M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8L14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;
    const BUTTON_TEXT = "aTisket";
    const COUNTRIES = encodeURIComponent(`GB,US,DE`);
    const ATISKET_URL = `https://etc.marlonob.info/atisket/`;
    const COLLECTION_CLASSES =
        "div.crsl-item.col-xs-12.col-sm-12.col-md-12.col-lg-12";
    const ARTIST_CLASSES = ".albums, .singles, .appears_on";
    const MOUNT_CLASSES = ".AlbumRoot";
    const CARD_CLASSES = ".Card.Card--album";

    const BROWSE_REGEXP = new RegExp(
        /spotify:app:browse:(album)/
    );

    function createAtisketButton() {
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add(
            "Header__button"
        );
        const button = document.createElement("button");
        button.classList.add(
            "custom-atisket",
            "Button",
            "CanonicalButton",
            "Button--style-icon-stroke",
            "Button--size-32"
        );
        button.type = "button";
        button.ariaLabel = "Open in aTisket";
        button.dataTooltipText = "Open in aTisket";
        button.ariaRelevant = "text";
        button.ariaLive = "off";
        button.dataTooltipText = "aTisket";
        button.dataTaId = "ta-atisket-button";
        button.style.setProperty( "--button-size", "32px");

        iconXML = htmlToElement(ATISKET_ICON);
        iconXML.style.fill = "white";

        button.appendChild(iconXML);
        buttonDiv.appendChild(button);

        return buttonDiv;
    }

    Spicetify.Player.addEventListener("appchange", ({ data: data }) => {
        if (data.isEmbeddedApp === true) {
            if (data.id === "album") {
                findHeaderButtons(data.container, MOUNT_CLASSES);
            }
        } else {
            const doc = data.container.contentDocument;
            if (BROWSE_REGEXP.test(data.uri)) {
                findHeaderButtons(doc, COLLECTION_CLASSES);
            } else if (data.id === "album") {
                findHeaderButtons(doc, ARTIST_CLASSES);
            }
        }
    });

    /**
     *
     * @param {HTMLElement | Document} activeDoc
     * @param {string} classes
     * @param {number} retry
     */
    function findHeaderButtons(activeDoc, classes, retry = 0) {
        if (retry > 10) return;
        const crslItems = activeDoc.querySelectorAll(classes);
        if (crslItems.length > 0) {
            crslItems.forEach(appendAtisket);
        } else {
            setTimeout(() => findHeaderButtons(activeDoc, classes, ++retry), 1000);
        }
    }

    /**
     *
     * @param {HTMLElement} item
     */
    function appendAtisket(item) {
        uri = "";
        uriElement = item.querySelector(CARD_CLASSES);
        if (typeof uriElement !== 'undefined') {
            uri = uriElement.getAttribute("data-uri");
            uri && filterURI(uri);
        }

        if (
            item.querySelectorAll("button.custom-atisket").length === 0 &&
            uri.length > 0
        ) {
            const playButton = item.querySelector('.Header__button button[data-ta-id="play-button"]');
            let re = /.*\:(.*)$/;
            uri = re.exec(uri)[1];
            const headerButtons = item.querySelector(".Header__buttons");
            const moreButton = item.querySelector('button[aria-label="More"]').parentNode;
            button = createAtisketButton(uri, item);
            albumLink = `${ATISKET_URL}?preferred_countries=${COUNTRIES}&spf_id=${uri}&preferred_vendor=spf`;
            button.onclick = () => {
                newTab(albumLink);
            };
            headerButtons.insertBefore(button, moreButton);
        }
    }

    /**
     * @param {string} uri
     * @returns {boolean}
     */
    function filterURI(uri) {
        const uriObj = Spicetify.URI.from(uri);
        if (
            uriObj.type === Spicetify.URI.Type.ALBUM
        ) {
            return true;
        }

        return false;
    }
    /**
     * @param {String} HTML representing a single element
     * @return {Element}
     */
    function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    /**
     *
     * @param {string} URL
     */
    function newTab(URL){
        window.open(URL, '_blank');
    }
})();
