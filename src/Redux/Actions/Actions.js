import ACTIONTYPE from "./ActionType";

export const addQuiz = (data) => {
    return {
      type: ACTIONTYPE.ADDQUIZ,
      payload: data,
    };
  };
  export const toggleActive = (id) => {
    return {
      type: ACTIONTYPE.TOGGLEACTIVE,
      payload: id,
    };
  };
  
  export const deleteQuiz = (id) => {
    return {
      type: ACTIONTYPE.DELETEQUIZ,
      payload: id,
    };
  };
    export const playQuiz = (id) => {
    return {
      type: ACTIONTYPE.PLAYQUIZ,
      payload: id,
    };
  };
  export const getName = (name) => {
    return {
      type: ACTIONTYPE.GETNAME,
      payload: name,
    };
  };
  
  
  export const getAnswer = (ans) => {
    return {
      type: ACTIONTYPE.GETANSWER,
      payload: ans,
    };
  };
  export const resetQuiz = () => {
    return {
      type: ACTIONTYPE.RESET,
    };
  };
 