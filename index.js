function playFaster (speed = 2) {
  [...document.getElementsByTagName('video')].forEach(l => l.playbackRate = speed)
}
// Options for the observer (which mutations to observe)
const config = { childList: true };

const nodeIsVideo = n => n.nodeName === 'VIDEO'

// Callback function to execute when mutations are observed
const callback = (mutationsList, observer) => {
  for(const mutation of mutationsList) {
    console.log(mutation)
    const { type, addedNodes } = mutation
    const addedNodesArray = Array.from(addedNodes)

    if (addedNodesArray.find(nodeIsVideo)) {
      playFaster()
      const addedVideoNodes = addedNodesArray.filter(nodeIsVideo)

      for (const vn of addedVideoNodes) {
        const cb = (mutationsList, observer) => {
          for(const mut of mutationsList) {
            const { type } = mut

            console.log(type, mut)
          }
        }
        const ob = new MutationObserver(cb)

        ob.observe(vn, { attributes: true, childList: true, subtree: true })
      }
    } // TODO listen to video elements for attribute modification to prevent external modification

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
const observer = new MutationObserver(callback)

// Start observing the target node for configured mutations
observer.observe(document.body, config)
