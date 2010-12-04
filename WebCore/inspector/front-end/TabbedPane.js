/*
 * Copyright (C) 2010 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

WebInspector.TabbedPane = function(element)
{
    this.element = element || document.createElement("div");
    this.element.addStyleClass("tabbed-pane");
    this.tabsElement = this.element.createChild("div", "tabbed-pane-header");
    this.contentElement = this.element.createChild("div", "tabbed-pane-content");

    this._tabObjects = {};
}

WebInspector.TabbedPane.prototype = {
    appendTab: function(id, tabTitle, content, tabClickListener)
    {
        var tabElement = document.createElement("li");
        tabElement.textContent = tabTitle;
        tabElement.addEventListener("click", tabClickListener, false);
        this.tabsElement.appendChild(tabElement);
        var tabObject = { tab: tabElement };
        if (content instanceof HTMLElement) {
            tabObject.element = content;
            this.contentElement.appendChild(content);
        }
        else {
            this.contentElement.appendChild(content.element);
            tabObject.view = content;
        }
        this._tabObjects[id] = tabObject;
    },

    hasTab: function(tabId)
    {
        return tabId in this._tabObjects;
    },
     
    selectTabById: function(tabId)
    {
        for (var id in this._tabObjects) {
            if (id === tabId)
                this._showTab(this._tabObjects[id]);
            else
                this._hideTab(this._tabObjects[id]);
        }
        return this.hasTab(tabId);
    },

    _showTab: function(tabObject)
    {
        tabObject.tab.addStyleClass("selected");
        if (tabObject.element)
            tabObject.element.removeStyleClass("hidden");
        else
            tabObject.view.visible = true;
    },

    _hideTab: function(tabObject)
    {
        tabObject.tab.removeStyleClass("selected");
        if (tabObject.element)
            tabObject.element.addStyleClass("hidden");
        else
            tabObject.view.visible = false;
    }
}
