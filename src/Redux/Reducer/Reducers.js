import ACTIONTYPE from "../Actions/ActionType";

//  this is our initital state of the app //
const initialState = {
  quiz: [],
  name: "",
  playQuiz: [],
  answers: [],
};

// the reducer containes all the necessary functions in order to update our state accordingly //

 const reducer = (state = initialState, actions) => {
  if (actions.type === ACTIONTYPE.ADDQUIZ) {
    return { ...state, quiz: [...state.quiz, actions.payload] };
  }

  if (actions.type === ACTIONTYPE.TOGGLEACTIVE) {
    const quizElem = state.quiz.find((el) => el.id === actions.payload);

    const filteredArr = state.quiz.filter((el) => el.id !== actions.payload);

    const newArr = [
      { ...quizElem, isActive: !quizElem.isActive },
      ...filteredArr,
    ];

    return {
      ...state,
      quiz: newArr,
    };
  }

  if (actions.type === ACTIONTYPE.DELETEQUIZ) {
    const filteredArr = state.quiz.filter((el) => el.id !== actions.payload);

    return {
      ...state,
      quiz: filteredArr,
    };
  }

  if (actions.type === ACTIONTYPE.GETNAME) {
    return {
      ...state,
      name: actions.payload,
    };
  }

  if (actions.type === ACTIONTYPE.PLAYQUIZ) {
    const quizElem = state.quiz.find((el) => el.id === actions.payload);

    return {
      ...state,
      playQuiz: quizElem,
      title:quizElem.title,
    };
  }

  if (actions.type === ACTIONTYPE.GETANSWER) {
   
    return {
      ...state,
      answers: [...state.answers, actions.payload],
    };
  }

  if (actions.type === ACTIONTYPE.RESET) {
    return {
      ...state,
      name: "",
      playQuiz: [],
      answers: [],
    };
  }

  return state;
};

export default reducer;