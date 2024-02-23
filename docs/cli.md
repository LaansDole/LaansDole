# **Terminal Portfolio <i class="fa-solid fa-terminal"></i>**

<div class="cli-body">
    <div class="container">
      <pre id="laansdole-logo">
    
         _       ___     ___    _  _     ___     ___     ___     _       ___   
        | |     /   \   /   \  | \| |   / __|   |   \   / _ \   | |     | __|  
 ->     | |__   | - |   | - |  | .` |   \__ \   | |) | | (_) |  | |__   | _|   
 ->     |____|  |_|_|   |_|_|  |_|\_|   |___/   |___/   \___/   |____|  |___|  
 ->   _|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""| 
      "`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'                                                      
    </pre>
      Welcome to my Terminal Portfolio! <a href="https://laansdole.github.io/LaansDole/cli/" target="_self">Refresh</a> the browser and Have fun!
      <div class="setting">
        <button id="settingsButton">Terminal Settings</button>
        <dialog id="settingsDialog">
          <form method="dialog">
            <select id="fontSelector" title="Choose a font">
              <option value="CaskaydiaCoveNerdFont-Bold">
                CaskaydiaCoveNerdFont-Bold
              </option>
              <option value="CaskaydiaCoveNerdFont-BoldItalic">
                CaskaydiaCoveNerdFont-BoldItalic
              </option>
              <option value="CaskaydiaCoveNerdFont-ExtraLight">
                CaskaydiaCoveNerdFont-ExtraLight
              </option>
              <option value="CaskaydiaCoveNerdFont-ExtraLightItalic">
                CaskaydiaCoveNerdFont-ExtraLightItalic
              </option>
              <option value="CaskaydiaCoveNerdFont-Italic">
                CaskaydiaCoveNerdFont-Italic
              </option>
            </select>
            <label id="labelGuestColor" for="guestColorSelector">Guest Color:</label>
            <input type="color" id="guestColorSelector" value="#2fbb4f" />
            <label id="labelHostnameColor" for="hostnameColorSelector">Hostname Color:<label>
            <input type="color" id="hostnameColorSelector" value="#b026ff" />
            <button onclick="changeSettings()">Apply Settings</button>
            <button type="button" onclick="resetSettings()">
              Reset to Default
            </button>
          </form>
          <button id="closeButton">x</button>
        </dialog>
      </div>
      <div class="terminal">
        <label for="prompt">
          <div class="flexbox">
            <span id="guest" class="green nospace">guest</span>
            <span class="light-dark nospace">@</span>
            <span id="hostname" class="purple nospace">laansdole.github.io</span>
            <!-- <span class="light-dark nospace">:$ ~ </span> -->
            <span class="light-dark nospace">:</span>
            <span class="light-dark space">$</span>
            <span><input id="prompt" type="text" placeholder="help" autocomplete="on" autofocus/></span>
          </div>
        </label>
      </div>
    </div>
</div>