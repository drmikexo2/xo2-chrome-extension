var the_set = new Set;

function load_all_users() {
  const this_version = chrome.runtime.getManifest().version;
  //console.log("xo2 version: " + this_version);
  const url = "https://www.xo2.com/all_users.txt";

  let request = new XMLHttpRequest();
  request.open('GET', url, false); // false makes the request synchronous
  request.setRequestHeader("X-xo2-Version", "xo2/" + this_version);
  request.send(null);

  if (request.status === 200) {
      str = request.responseText;
      arr = str.split(", ");
      newset = new Set(arr);
      return newset;
  } else {
      console.error("Error fetching data:", request.statusText);
      return new Set(); // Return an empty Set in case of an error
  }
}


function does_username_exist_in_xo2_database(username) {
    if (the_set.size === 0) {
      //console.log("empty set. loading users.")
      the_set = load_all_users();
    }
    if (the_set.has(username)) {
      return true;
    } else {
      return false;
    }
  }
  

function createButton(username) {
    var button = document.createElement("button");  
    button.innerHTML = "📈 xo2";
    button.style.boxShadow = "inset 0 0 0 1px grey";
    button.style.color = "rgb(29,155,240)";
    button.style.borderRadius = "0.25rem";
    button.style.cursor = "pointer";
    button.style.fontSize = "11px";
    button.style.padding = "0.25em 0.4em";
    button.style.fontWeight = "700";
    button.style.lineHeight = "1";
    button.style.border = "0px";
    button.style.margin = "0em 0em 0em 0.5em";
    button.onclick = function(event) {
        window.open('https://www.xo2.com/twitter/twitter_user/' + username + '?utm_source=xo2_chrome_extension', '_blank');
        return false;
    }
    return button;
}

function createAddButton(username) {
    var button = document.createElement("button");  
    button.innerHTML = "add to xo2";
    button.style.boxShadow = "inset 0 0 0 1px grey";
    button.style.color = "rgb(140,140,140)";
    button.style.borderRadius = "0.25rem";
    button.style.cursor = "pointer";
    button.style.fontSize = "11px";
    button.style.padding = "0.25em 0.4em";
    button.style.fontWeight = "700";
    button.style.lineHeight = "1";
    button.style.border = "0px";
    button.style.margin = "0em 0em 0em 0.5em";
    button.onclick = function(event) {
        window.open('https://www.xo2.com/twitter/twitter_user/' + username + '?utm_source=xo2_chrome_extension', '_blank');
        return false;
    }
    return button;
}

function attachButtonToUserNameProfile() {
    var element = document.querySelector("div[data-testid='UserName'] div:nth-child(2) span");
    var xo2button = document.querySelector(".profile-xo2-button");

    if (document.body.contains(element) && !document.body.contains(xo2button)) {
        var username = element.innerHTML.substr(1)
        if (!does_username_exist_in_xo2_database(username)) {
            var button = createAddButton(username);
        } else {
            var button = createButton(username);
        }
        button.className = "profile-xo2-button";
        element.parentNode.appendChild(button)
    }
}

function attachButtonToUsername() {
    var divToCapture = Array.from(
        document.querySelectorAll("div[data-testid^='User'] a[role='link']:not(a[aria-label='Tweet']) > div[dir='ltr'] > span:only-child")
    )
    divToCapture.forEach(element => {        
        var username = element.innerHTML.substr(1)
        if (!does_username_exist_in_xo2_database(username)) {
            var button = createAddButton(username);
        } else {
            var button = createButton(username);
        }
        element.parentNode.appendChild(button)
    });
}

setInterval(function() {
    attachButtonToUserNameProfile()
    attachButtonToUsername()
  }, 100);

