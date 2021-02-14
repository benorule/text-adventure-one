const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You are asleep in a hotel room. Suddenly, you are awoken suddenly by the bloodcurdling sound of a woman screaming.',
    options: [
      {
        text: 'Investigate',
        setState: { unarmed: true },
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'As you move to exit your cabin, your eyes fall upon a large kitchen knife on the table across the room.',
    options: [
      {
        text: 'Take the knife',
        setState: { unarmed: false, knife: true },
        nextText: 3
      },
      {
        text: 'Leave the knife',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'You exit your room into the coridoor and see a shrouded figure walking away.',
    options: [
      {
        text: 'Call out',
        nextText: 4
      },
      {
        text: 'Stay silent',
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: 'The man turns around and faces you.',
    options: [
      {
        text: 'Continue',
        requiredState: (currentState) => currentState.knife,
        nextText: 6
      },
      {
        text: 'Continue',
        requiredState: (currentState) => currentState.unarmed,
        nextText: 7
      }
    ]
  },
  {
    id: 5,
    text: 'The figure turns a corner',
    options: [
      {
        text: 'Follow him',
        nextText: 8
      },
      {
        text: 'Stay put',
        nextText: 9
      }
    ]
  },
  {
    id: 6,
    text: 'The man sees te knife and continues to flee.',
    options: [
      {
        text: 'Follow him',
        nextText: 8
      },
      {
        text: 'Stay put',
        nextText: 9
      }
    ]
  },
  {
    id: 7,
    text: 'The man starts coming towards you.',
    options: [
      {
        text: 'Run away',
        nextText: 13
      },
      {
        text: 'Stay put',
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'He got away. You lost sight of him in the darkness.',
    options: [
      {
        text: 'Continue',
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: 'The corridor is suddenly illuminated by a flash light. You turn around to face a security guard.',
    options: [
      {
        text: 'Continue',
        requiredState: (currentState) => currentState.knife,
        nextText: 10
      },
      {
        text: 'Continue',
        requiredState: (currentState) => currentState.unarmed,
        nextText: 12
      }
    ]
  },
  {
    id: 10,
    text: 'The guard sees the knife in your hand and becomes convinced that you are the murderer.',
    options: [
      {
        text: 'You lose',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'The murderer attacks you with the same knife he used to kill his last victim.',
    options: [
      {
        text: 'You lose',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: 'The guard questions why you are out of your room.',
    options: [
      {
        text: 'Explain',
        nextText: 14
      }
    ]
  },
  {
    id: 13,
    text: 'You bump into a security guard while running away. The murderer turns back and disappears. ',
    options: [
      {
        text: 'Explain',
        nextText: 14
      }
    ]
  },
  {
    id: 14,
    text: 'The guard has locked all of the hotels exits. He asks your opinion on what to do next.',
    options: [
      {
        text: 'Survey all of the rooms.',
        nextText: 16
      },
      {
        text: 'Try to catch up with the murderer.',
        nextText: 15
      }
    ]
  },
  {
    id: 15,
    text: 'He got away. In the darkness you lost sight of him.',
    options: [
      {
        text: 'Survey all of the rooms.',
        nextText: 16
      }
    ]
  },
  {
    id: 16,
    text: 'Upon entering room 17 you see a man frantically washing his hands in the sink. They are covered in blood.',
    options: [
      {
        text: 'Attempt to restrain him.',
        nextText: 17
      },
      {
        text: 'Call out to the guard.',
        nextText: 18
      }
    ]
  },
  {
    id: 17,
    text: 'The murderer attacks you with the same knife he used to kill his last victim.',
    options: [
      {
        text: 'You lose',
        nextText: -1
      }
    ]
  },
  {
    id: 18,
    text: 'The guard tazers the murderer and places him in handcuffs.',
    options: [
      {
        text: 'You win',
        nextText: -1
      }
    ]
  }
]

startGame()