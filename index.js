function playFaster (speed = 2) {
  [...document.getElementsByTagName('video')].forEach(l => l.playbackRate = speed)
}
// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  for(var mutation of mutationsList) {
    console.log(mutation)
    const { type, addedNodes } = mutation

    if (addedNodes.find(n => n.nodeName === 'VIDEO')) playFaster() // TODO listen to video elements for attribute modification to prevent external modification

    // switch (type) {
    //   case 'attributes':
    //     console.log(type, mutation)
    //     break
    //   case 'childList':
    //     console.log(type, mutation)
    //     break
    //   case 'subtree':
    //     console.log(type, mutation)
    //     break
    //   default:
    //     console.log(type, mutation)
    // }
  }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(document.body, config);
