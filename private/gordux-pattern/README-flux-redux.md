
craft a better state management architecture
implented with no framework at all

is stated that Redux combines the ideas from:

- [The Command pattern]()
- [The Elm Architecture]()

using message-passing (also known as [event-driven programming](https://en.wikipedia.org/wiki/Event-driven_programming)) to manage application state

think of **state** as being in a **"predictable container"** that only changes as a reaction to these "events".

## **finite state machine** explicit **rules**
a finite state machine is a computational model centered around states, events, and transitions between states

explicit rules:
- Any software you make can be described in a finite number of states (e.g., idle, loading, success, error)
- You can only be in one of those states at any given time (e.g., you can’t be in the success and error states at the same time)
- You always start at some initial state (e.g., idle)
- You move from state to state, or transition, based on **events** (e.g., from the idle state, when the LOAD event occurs, you immediately transition to the loading state)

## role of the **event handlers** 
event handlers can only do one main thing: forward their events to a state machine.
    - buttons: don’t actually do **operations** or **execute actions**; rather, they **send "signals"** to some central unit that manages (or orchestrates) state
    - that unit decides what should happen when it receives that "signal".

## *extended state* coherence logic
there is a clear distinction between *finite state* and *extended state*, and there is *logic* that prevents the application from reaching an **impossible state**,

# pattern comparison
## redux
state + action = newState
## fsm 
state + event = newState + effects

# reducers 
*pure functions*
```
function userReducer(state, event) {
  // Return the next state, which is
  // determined based on the current `state`
  // and the received `event` object

  // This nextState may contain a "finite"
  // state value, as well as "extended"
  // state values.

  // It may also contain side-effects
  // to be executed by some interpreter.
  return nextState;
}
```

# Difference: events vs. actions
In state machine terminology, an "action" is a side-effect that occurs as the result of a transition:
<cite>
When an event instance is dispatched, the state machine responds by performing actions, such as changing a variable, performing I/O, invoking a function, generating another event instance, or changing to another state.
</cite>
- An **event** describes something that occurred. Events trigger *state transitions*.
- An **action** describes a side-effect that should occur as a response to a *state transition*.

## transitions. 
A transition describes how one finite state transitions to another finite state due to an event.

There are clear sequences of events that need to occur to transition from one state to another.


The nice part about this is not having to defensively check if anything has changed before processing interactions. Is there an alternative to this which doesn’t require being defensive on the interaction side?

# ref
- https://dev.to/davidkpiano/redux-is-half-of-a-pattern-1-2-1hd7?utm_source=Iterable&utm_medium=email&utm_campaign=the_overflow_newsletter&utm_content=01-23-20
- https://k94n.com/gordux-js-the-redux-pattern-in-vanilla-js


# Redux
- https://medium.com/@lavitr01051977/basic-react-redux-app-with-async-call-to-api-e478e6e0c48b
    - ![basic-react-redux-app-with-async-call-to-api](./images/basic-react-redux-app-with-async-call-to-api.jpg)

- https://hackernoon.com/handling-ajax-in-your-react-application-with-agility-413f1f21fc70
    - https://github.com/rowlandekemezie/Redux-saga-tutor
    - ![esempio con github api e graphql](./images/redux-workflow-example.png)

- https://dev.to/bouhm/react-redux-flow-terminologies-and-example-104b
    - ![](./images/redux-workflow-example.png)


- ![](./images/react-redux-overview.png)


# CustomEvent 

- https://github.com/webmodules/custom-event