// SweetAlert
// 2014 (c) - Tristan Edwards
// github.com/t4t5/sweetalert
(function (window, document) {

    var modalClass = '.sweet-alert',
        overlayClass = '.sweet-overlay',
        alertTypes = ['error', 'warning', 'info', 'success', 'custom'],
        modalQ = [], //hold modals in array rather then nodeList
        showEvent = new Event('show');
    /*
     * Manipulate DOM
     */

    var getModal = function () {
            return document.querySelector(modalClass);
        },
        getVisibleModal = function () {
            for (var i in modalQ) {
                if (modalQ[i].classList.contains('showSweetAlert')) {
                    return modalQ[i];
                }
            }
            return null;
        },
        getModalIndex = function (modal) {
            return modalQ.indexOf(modal);
        },
        getPreviousModal = function (modal) {
            return modalQ[getModalIndex(modal) - 1] || null
        },
        getNextModal = function (modal) {
            return modalQ[getModalIndex(modal) + 1] || null;
        },
        isValidType = function (type) {
            if (type) {
                if (alertTypes.indexOf(type) > -1)
                    return true;
                else
                    window.console.error('Unknown alert type: ' + type);
            }
            return false;
        },
        getWrapper = function () {
            return document.querySelector('#sweet-wrap');
        },
        getOverlay = function () {
            return document.querySelector(overlayClass);
        },
        hasClass = function (elem, className) {
            return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
        },
        addClass = function (elem, className) {
            if (!hasClass(elem, className)) {
                elem.className += ' ' + className;
            }
        },
        removeClass = function (elem, className) {
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
            if (hasClass(elem, className)) {
                while (newClass.indexOf(' ' + className + ' ') >= 0) {
                    newClass = newClass.replace(' ' + className + ' ', ' ');
                }
                elem.className = newClass.replace(/^\s+|\s+$/g, '');
            }
        },
        escapeHtml = function (str) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        },
        _show = function (elem) {
            elem.style.opacity = '';
            elem.style.display = 'block';
        },
        show = function (elems) {
            if (elems && !elems.length) {
                return _show(elems);
            }
            for (var i = 0; i < elems.length; ++i) {
                _show(elems[i]);
            }
        },
        _hide = function (elem) {
            elem.style.opacity = '';
            elem.style.display = 'none';
        },
        hide = function (elems) {
            if (elems && !elems.length) {
                return _hide(elems);
            }
            for (var i = 0; i < elems.length; ++i) {
                _hide(elems[i]);
            }
        },
        isDescendant = function (parent, child) {
            var node = child.parentNode;
            while (node !== null) {
                if (node === parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        },
        getTopMargin = function (elem) {
            var prevLeft = elem.style.left,
                prevDisplay = elem.style.display;
            elem.style.left = '-9999px';
            elem.style.display = 'block';

            var height = elem.clientHeight;
            var padding = parseInt(getComputedStyle(elem).getPropertyValue('padding'), 10);

            elem.style.left = prevLeft || '';
            elem.style.display = prevDisplay || 'none';
            return ('-' + parseInt(height / 2 + padding) + 'px');
        },
        fadeIn = function (elem, interval) {
            interval = interval || 16;
            elem.style.opacity = 0;
            elem.style.display = 'block';
            var last = +new Date();
            var tick = function () {
                elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
                last = +new Date();

                if (+elem.style.opacity < 1) {
                    setTimeout(tick, interval);
                }
            };
            tick();
        },
        fadeOut = function (elem, interval) {
            interval = interval || 16;
            elem.style.opacity = 1;
            var last = +new Date();
            var tick = function () {
                elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
                last = +new Date();

                if (+elem.style.opacity > 0) {
                    setTimeout(tick, interval);
                } else {
                    elem.style.display = 'none';
                }
            };
            tick();
        },
        fireClick = function (node) {
            // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
            // Then fixed for today's Chrome browser.
            if (MouseEvent) {
                // Up-to-date approach
                var mevt = new MouseEvent('click', {
                    view: window,
                    bubbles: false,
                    cancelable: true
                });
                node.dispatchEvent(mevt);
            } else if (document.createEvent) {
                // Fallback
                var evt = document.createEvent('MouseEvents');
                evt.initEvent('click', false, false);
                node.dispatchEvent(evt);
            } else if (document.createEventObject) {
                node.fireEvent('onclick');
            } else if (typeof node.onclick === 'function') {
                node.onclick();
            }
        },
        stopEventPropagation = function (e) {
            // In particular, make sure the space bar doesn't scroll the main window.
            if (typeof e.stopPropagation === 'function') {
                e.stopPropagation();
                e.preventDefault();
            } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
                window.event.cancelBubble = true;
            }
        },
        createModal = function (params) {
            var modal = document.createElement('div'),
                title = document.createElement('h2');
            modal.className = 'sweet-alert';
            modal.setAttribute('tabIndex', '-1');
            if (params.type) {
                var icon = document.createElement('div');
                icon.className = 'icon ' + params.type;
                switch (params.type) {
                case 'success':
                    icon.innerHTML = '<span class="line tip"></span> <span class="line long"></span> <div class="placeholder"></div> <div class="fix"></div>';
                    break;
                case 'error':
                    icon.innerHTML = '<span class="x-mark"><span class="line left"></span><span class="line right"></span></span>';
                    break;
                case 'warning':
                    icon.innerHTML = '<span class="body"></span> <span class="dot"></span>';
                    break;
                default:
                    icon.innerHTML = '';
                    break;
                }
                modal.appendChild(icon);
            }
            title.innerHTML = escapeHtml(params.title).split(/\n/).join('<br>');
            modal.appendChild(title);
            if (params.text) {
                var text = document.createElement('p');
                text.innerHTML = escapeHtml(params.text).split(/\n/).join('<br>');
                modal.appendChild(text);
            }
            if (params.body) {
                var body = document.createElement('div');
                body.className = 'sweet-body';
                body.style.maxHeight = '500px';
                body.style.overflowY = 'scroll';
                if (typeof params.body === 'string') {
                    body.innerHTML = params.body;
                } else {
                    body.appendChild(params.body);
                }
                modal.appendChild(body);
            }
            if (params.showCancelButton) {
                var cancel = document.createElement('button');
                cancel.className = 'cancel';
                cancel.innerHTML = params.cancelButtonText;
                modal.setAttribute('data-has-cancel-button', params.showCancelButton);
                modal.appendChild(cancel);
            }
            modal.setAttribute('data-allow-ouside-click', params.allowOutsideClick)
            var confirm = document.createElement('button');
            confirm.className = 'confirm';
            confirm.innerHTML = params.confirmButtonText;
            var hasDoneFunction = (params.doneFunction) ? true : false;
            modal.setAttribute('data-has-done-function', hasDoneFunction);
            // Set confirm button to selected background color
            confirm.style.backgroundColor = params.confirmButtonColor;

            // Set box-shadow to default focused button
            setFocusStyle(confirm, params.confirmButtonColor);
            modal.appendChild(confirm);
            var v = getVisibleModal();
            var i = modalQ.length;
            if (params.displayImmediately && v) {
                i = getModalIndex(v) + 1;
            }
            modalQ.splice(i, 0, modal);
            setModal(modal);
            return modal;
        },
        setModal = function (modal) {
            getWrapper().appendChild(modal);
        },
        setButtonActions = function (modal, params) {
            modal.addEventListener('show', function () {
                var onButtonClick = function (e) {
                        console.log(e.target);
                        var target = e.target || e.srcElement,
                            targetedConfirm = (target.className === 'confirm'),
                            targetedCancel = (target.className === 'cancel'),
                            modalIsVisible = hasClass(modal, 'visible') || hasClass(modal, 'showSweetAlert'),
                            doneFunctionExists = (params.doneFunction && modal.getAttribute('data-has-done-function') === 'true');
                        stopEventPropagation(e);

                        if (targetedConfirm && doneFunctionExists && modalIsVisible) {
                            params.doneFunction(e);
                        }
                        if (targetedConfirm || targetedCancel) {
                            removeModal(modal);
                        } else {
                            var targetFunction = (target.getAttribute('onclick')) ? window[target.getAttribute('onclick').replace(/ *\([^)]*\) */g, "")] : params.buttonActions[target.className];
                            if (targetFunction) {
                                targetFunction(e); //pass e allowing for a bit of accessibility
                                setButtonActions(modal, params); //resets the actions incase new elements have been added to dom
                            }
                        }
                        fixVerticalPosition(modal);
                    },
                    onButtonMouseOver = function (e) {
                        var target = e.target || e.srcElement,
                            targetedConfirm = (target.className === 'confirm');
                        if (targetedConfirm) {
                            e.target.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.04);
                        }
                    },
                    onButtonMouseOut = function (e) {
                        var target = e.target || e.srcElement,
                            targetedConfirm = (target.className === 'confirm');
                        if (targetedConfirm) {
                            e.target.style.backgroundColor = params.confirmButtonColor;
                        }
                    },
                    onButtonMouseDown = function (e) {
                        var target = e.target || e.srcElement,
                            targetedConfirm = (target.className === 'confirm');
                        if (targetedConfirm) {
                            e.target.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.14);
                        }
                    },
                    onButtonMouseUp = function (e) {
                        var target = e.target || e.srcElement,
                            targetedConfirm = (target.className === 'confirm');
                        if (targetedConfirm) {
                            e.target.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.04);
                        }
                    },
                    onButtonFocus = function (e) {
                        var target = e.target || e.srcElement,
                            targetedConfirm = (target.className === 'confirm');
                        var $confirmButton = modal.querySelector('button.confirm'),
                            $cancelButton = modal.querySelector('button.cancel');

                        if (targetedConfirm && $cancelButton) {
                            $cancelButton.style.boxShadow = 'none';
                        } else {
                            $confirmButton.style.boxShadow = 'none';
                        }
                    }
                var $buttons = modal.querySelectorAll('button');
                for (var i = 0; i < $buttons.length; i++) {
                    $buttons[i].onclick = onButtonClick;
                    $buttons[i].onmouseover = onButtonMouseOver;
                    $buttons[i].onmouseout = onButtonMouseOut;
                    $buttons[i].onmousedown = onButtonMouseDown;
                    //$buttons[i].onmouseup   = onButtonMouseUp;
                    $buttons[i].onfocus = onButtonFocus;
                }
                previousDocumentClick = document.onclick;
                document.onclick = function (e) {
                    var target = e.target || e.srcElement;
                    var clickedOnModal = (modal === target),
                        clickedOnModalChild = isDescendant(modal, e.target),
                        modalIsVisible = hasClass(modal, 'visible') || hasClass(modal, 'showSweetAlert'),
                        outsideClickIsAllowed = modal.getAttribute('data-allow-ouside-click') === 'true';

                    if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && outsideClickIsAllowed) {
                        removeModal(modal);
                    }
                };
                var $okButton = modal.querySelector('button.confirm'),
                    $cancelButton = modal.querySelector('button.cancel'),
                    $modalButtons = modal.querySelectorAll('button:not([type=hidden])');

                function handleKeyDown(e) {
                    var keyCode = e.keyCode || e.which;

                    if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
                        // Don't do work on keys we don't care about.
                        return;
                    }
                    var $targetElement = e.target || e.srcElement;
                    var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
                    for (var i = 0; i < $modalButtons.length; i++) {
                        if ($targetElement === $modalButtons[i]) {
                            btnIndex = i;
                            break;
                        }
                    }

                    if (keyCode === 9) {
                        // TAB
                        if (btnIndex === -1) {
                            // No button focused. Jump to the confirm button.
                            $targetElement = $okButton;
                        } else {
                            // Cycle to the next button
                            if (btnIndex === $modalButtons.length - 1) {
                                $targetElement = $modalButtons[0];
                            } else {
                                $targetElement = $modalButtons[btnIndex + 1];
                            }
                        }

                        stopEventPropagation(e);
                        $targetElement.focus();
                        //setFocusStyle($targetElement, params.confirmButtonColor); // TODO

                    } else {
                        if (keyCode === 13 || keyCode === 32) {
                            if (btnIndex === -1) {
                                // ENTER/SPACE clicked outside of a button.
                                $targetElement = $okButton;
                            } else {
                                // Do nothing - let the browser handle it.
                                $targetElement = undefined;
                            }
                        } else if (keyCode === 27) {
                            if ($cancelButton != null) {
                                // ESC to cancel only if there's a cancel button displayed (like the alert() window).
                                $targetElement = $cancelButton;
                            }
                        } else {
                            // Fallback - let the browser handle it.
                            $targetElement = undefined;
                        }
                        if ($targetElement !== undefined) {
                            fireClick($targetElement, e);
                        }
                    }
                }

                previousWindowKeyDown = window.onkeydown;
                window.onkeydown = handleKeyDown;

                function handleOnBlur(e) {
                    var $targetElement = e.target || e.srcElement,
                        $focusElement = e.relatedTarget,
                        modalIsVisible = hasClass(modal, 'visible');

                    if (modalIsVisible) {
                        var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.

                        if ($focusElement !== null) {
                            // If we picked something in the DOM to focus to, let's see if it was a button.
                            for (var i = 0; i < $modalButtons.length; i++) {
                                if ($focusElement === $modalButtons[i]) {
                                    btnIndex = i;
                                    break;
                                }
                            }

                            if (btnIndex === -1) { //I omitted this because it assumes buttons should be the only focusable elements in the modal
                                // Something in the dom, but not a visible button. Focus back on the button.
                                // $targetElement.focus();
                            }
                        } else {
                            // Exiting the DOM (e.g. clicked in the URL bar);
                            lastFocusedButton = $targetElement;
                        }
                    }
                }

                $okButton.onblur = handleOnBlur;
                if ($cancelButton)
                    $cancelButton.onblur = handleOnBlur;

                window.onfocus = function () {
                    // When the user has focused away and focused back from the whole window.
                    window.setTimeout(function () {
                        // Put in a timeout to jump out of the event sequence. Calling focus() in the event
                        // sequence confuses things.
                        if (lastFocusedButton !== undefined) {
                            lastFocusedButton.focus();
                            lastFocusedButton = undefined;
                        }
                    }, 0);
                };
            }, false);

        },
        setKeyDownHandler = function () {

        };
    // Remember state in cases where opening and handling a modal will fiddle with it.
    var previousActiveElement,
        previousDocumentClick,
        previousWindowKeyDown,
        lastFocusedButton;

    /*
     * Add overlay and wrapper to DOM
     */

    function initialize() {
        var sweetHTML = '<div class="sweet-overlay" tabIndex="-1">'
        sweetWrap = document.createElement('div');
        sweetWrap.setAttribute('id', 'sweet-wrap');

        sweetWrap.innerHTML = sweetHTML;

        // For readability: check sweet-alert.html
        document.body.appendChild(sweetWrap);

        // For development use only!
        /*jQuery.ajax({
        url: '../lib/sweet-alert.html', // Change path depending on file location
        dataType: 'html'
      })
      .done(function(html) {
        jQuery('body').append(html);
      });*/
    }



    /*
     * Global sweetAlert function
     */

    window.sweetAlert = window.swal = function () {
        // Default parameters
        var params = {
            title: '',
            text: '',
            body: '', //this will be an html area
            type: null,
            allowOutsideClick: false,
            showCancelButton: false,
            confirmButtonText: 'OK',
            confirmButtonColor: '#AEDEF4',
            cancelButtonText: 'Cancel',
            buttonActions: {}, //this is an object which can hold actions for buttons by className otherwise use onclick
            imageUrl: null,
            imageSize: null,
            displayImmediately: (!modalQ.length) ? true : false
        };

        if (arguments[0] === undefined) {
            window.console.error('sweetAlert expects at least 1 attribute!');
            return false;
        }


        switch (typeof arguments[0]) {

        case 'string':
            params.title = arguments[0];
            params.text = arguments[1] || '';
            params.type = (isValidType(arguments[2])) ? arguments[2] : '';

            break;

        case 'object':
            if (arguments[0].title === undefined) {
                window.console.error('Missing "title" argument!');
                return false;
            }

            params.title = arguments[0].title;
            params.text = arguments[0].text || params.text;
            params.body = arguments[0].body || params.body;
            params.type = (isValidType(arguments[0].type)) ? arguments[0].type : params.type;
            params.allowOutsideClick = arguments[0].allowOutsideClick || params.allowOutsideClick;
            params.showCancelButton = arguments[0].showCancelButton || params.showCancelButton;

            // Show "Confirm" instead of "OK" if cancel button is visible
            params.confirmButtonText = (params.showCancelButton) ? 'Confirm' : params.confirmButtonText;

            params.confirmButtonText = arguments[0].confirmButtonText || params.confirmButtonText;
            params.confirmButtonColor = arguments[0].confirmButtonColor || params.confirmButtonColor;
            params.cancelButtonText = arguments[0].cancelButtonText || params.cancelButtonText;
            params.imageUrl = arguments[0].imageUrl || params.imageUrl;
            params.imageSize = arguments[0].imageSize || params.imageSize;
            params.displayImmediately = arguments[0].displayImmediately || params.displayImmediately;
            params.buttonActions = arguments[0].buttonActions || params.buttonActions;
            params.doneFunction = arguments[1] || null;

            break;

        default:
            window.console.error('Unexpected type of argument! Expected "string" or "object", got ' + typeof arguments[0]);
            return false;

        }
        var modal = createModal(params);
        setButtonActions(modal, params);
        if (params.displayImmediately) {
            var visibleModal = getVisibleModal();
            if (visibleModal) {
                closeModal(visibleModal);
            }
            //console.log(params.confirmButtonColor);
            //setParameters(params);
            openModal(modal);
        }
    };


    /*
     * Set type, text and actions on modal (this method has been removed from the process however left for reference
     */

    function setParameters(params) {
        var modal = getModal();

        var $title = modal.querySelector('h2'),
            $text = modal.querySelector('p'),
            $cancelBtn = modal.querySelector('button.cancel'),
            $confirmBtn = modal.querySelector('button.confirm');

        // Title
        $title.innerHTML = escapeHtml(params.title).split("\n").join("<br>");

        // Text
        $text.innerHTML = escapeHtml(params.text || '').split("\n").join("<br>");
        if (params.text) {
            show($text);
        }

        // Icon
        hide(modal.querySelectorAll('.icon'));
        if (params.type) {
            var validType = false;
            for (var i = 0; i < alertTypes.length; i++) {
                if (params.type === alertTypes[i]) {
                    validType = true;
                    break;
                }
            }
            if (!validType) {
                window.console.error('Unknown alert type: ' + params.type);
                return false;
            }
            var $icon = modal.querySelector('.icon.' + params.type);
            show($icon);

            // Animate icon

        }

        // Custom image
        if (params.imageUrl) {
            var $customIcon = modal.querySelector('.icon.custom');

            $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
            show($customIcon);

            var _imgWidth = 80,
                _imgHeight = 80;

            if (params.imageSize) {
                var imgWidth = params.imageSize.split('x')[0];
                var imgHeight = params.imageSize.split('x')[1];

                if (!imgWidth || !imgHeight) {
                    window.console.error("Parameter imageSize expects value with format WIDTHxHEIGHT, got " + params.imageSize);
                } else {
                    _imgWidth = imgWidth;
                    _imgHeight = imgHeight;

                    $customIcon.css({
                        'width': imgWidth + 'px',
                        'height': imgHeight + 'px'
                    });
                }
            }
            $customIcon.setAttribute('style', $customIcon.getAttribute('style') + 'width:' + _imgWidth + 'px; height:' + _imgHeight + 'px');
        }

        // Cancel button
        modal.setAttribute('data-has-cancel-button', params.showCancelButton);
        if (params.showCancelButton) {
            $cancelBtn.style.display = 'inline-block';
        } else {
            hide($cancelBtn);
        }

        // Edit text on cancel and confirm buttons
        if (params.cancelButtonText) {
            $cancelBtn.innerHTML = escapeHtml(params.cancelButtonText);
        }
        if (params.confirmButtonText) {
            $confirmBtn.innerHTML = escapeHtml(params.confirmButtonText);
        }

        // Set confirm button to selected background color
        $confirmBtn.style.backgroundColor = params.confirmButtonColor;

        // Set box-shadow to default focused button
        setFocusStyle($confirmBtn, params.confirmButtonColor);

        // Allow outside click?
        modal.setAttribute('data-allow-ouside-click', params.allowOutsideClick);

        // Done-function
        var hasDoneFunction = (params.doneFunction) ? true : false;
        modal.setAttribute('data-has-done-function', hasDoneFunction);
    }


    /*
     * Set hover, active and focus-states for buttons (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
     */

    function colorLuminance(hex, lum) {
        // Validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // Convert to decimal and change luminosity
        var rgb = "#",
            c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
    }

    // Add box-shadow style to button (depending on its chosen bg-color)
    function setFocusStyle($button, bgColor) {
        var rgbColor = hexToRgb(bgColor);
        $button.style.boxShadow = '0 0 2px rgba(' + rgbColor + ', 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
    }



    /*
     * Animations
     */
    function animateIcon(modal) {
        var icon = modal.querySelector('.icon');
        if (icon) {
            var type = icon.classList[1];
            switch (type) {
            case "success":
                addClass(icon, 'animate');
                addClass(icon.querySelector('.tip'), 'animateSuccessTip');
                addClass(icon.querySelector('.long'), 'animateSuccessLong');
                break;
            case "error":
                addClass(icon, 'animateErrorIcon');
                addClass(icon.querySelector('.x-mark'), 'animateXMark');
                break;
            case "warning":
                addClass(icon, 'pulseWarning');
                addClass(icon.querySelector('.body'), 'pulseWarningIns');
                addClass(icon.querySelector('.dot'), 'pulseWarningIns');
                break;
            }
        }
    }

    function resetIconAnimation(modal) {
        var icon = modal.querySelector('.icon');
        if (icon) {
            var type = icon.classList[1];
            switch (type) {
            case 'success':
                removeClass(icon, 'animate');
                removeClass(icon.querySelector('.tip'), 'animateSuccessTip');
                removeClass(icon.querySelector('.long'), 'animateSuccessLong');
                break;
            case 'error':
                removeClass(icon, 'animateErrorIcon');
                removeClass(icon.querySelector('.x-mark'), 'animateXMark');
                break;
            case 'warning':
                removeClass(icon, 'pulseWarning');
                removeClass(icon.querySelector('.body'), 'pulsWarningIns');
                removeClass(icon.querySelector('.dot'), 'pulseWarningIns');
                break;
            default:
                break;
            }
        }
    }

    function openModal(modal) {
        fixVerticalPosition(modal);
        fadeIn(getOverlay(), 10);
        show(modal);
        addClass(modal, 'showSweetAlert');
        removeClass(modal, 'hideSweetAlert');
        animateIcon(modal);
        previousActiveElement = document.activeElement;
        var $okButton = modal.querySelector('button.confirm');
        setTimeout(function () {
            addClass(modal, 'visible');
        }, 500);
        $okButton.focus();
        setKeyDownHandler();
        modal.dispatchEvent(showEvent);
    }

    function closeModal(modal) {
        if (modalQ.length == 1)
            fadeOut(getOverlay(), 5);
        fadeOut(modal, 5);
        removeClass(modal, 'showSweetAlert');
        addClass(modal, 'hideSweetAlert');
        if (hasClass(modal, 'visible')) {
            removeClass(modal, 'visible');
        } else {
            onClassChange(modal, 1, function () {
                removeClass(modal, 'visible');
            });
        }
        resetIconAnimation(modal);
        // Reset the page to its previous state
        window.onkeydown = previousWindowKeyDown;
        document.onclick = previousDocumentClick;
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
        lastFocusedButton = undefined;
    }

    function removeModal(modal) {
        closeModal(modal);
        getWrapper().removeChild(modal);
        var nm = getPreviousModal(modal) || getNextModal(modal);
        modalQ.splice(modalQ.indexOf(modal), 1);
        if (nm) {
            openModal(nm);
        }

    }

    /*
     * Set "margin-top"-property on modal based on its computed height
     */

    function fixVerticalPosition(modal) {
        modal.style.marginTop = getTopMargin(modal);
    }

    function onClassChange(elem, exp, onChange) { //exp allows you to define number of times trigger can be used before closed
        var lcn = elem.className,
            exc = 0;
        var interval = window.setInterval(function () {
            var className = elem.className;
            if (className !== lcn) {
                onChange();
                lcn = className;
                exc++;
                if (exc == exp) {
                    window.clearInterval(interval);
                }
            }
        }, 10);
    }
    /*
     * If library is injected after page has loaded
     */

    (function () {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            initialize();
        } else {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', function factorial() {
                    document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                    initialize();
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState === 'complete') {
                        document.detachEvent('onreadystatechange', arguments.callee);
                        initialize();
                    }
                });
            }
        }
    })();

})(window, document);