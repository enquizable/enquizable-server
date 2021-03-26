## User

```javascript
const User = {
  _id: ObjectId(),
  username: {
    type: String,
    notNull: true,
    unique: true
  },
  email: {
    type: String,
    notNull: true,
    unique: true,
    $regex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
  },
  password: { // Jon, do we need this?
    type: String,
    notNull: true,
  }
}
```

## Quiz

```javascript
const Quiz = {
  _id: ObjectId(),
  owner: {
    type: ObjectId(), // ref USER
    notNull: true
  },
  name: {
    type: String,
    notNull: true,
    unique: 'owner.quiz.name' // name should be unique in the name-space of the owner
  },
  questions: {
    notNull: true,
    default: [], // can have a quiz with no questions so far
    type: [ObjectId()], // ref QUESTION
    max: 1000, // Not positive about this max number
  },
  tags: {
    notNull: true,
    default: [],
    type: [ObjectId()], // ref TAG
    max: 20,
  },
  upVoteCount: {
    notNull: true,
    type: Number,
    default: 0
  },
  downVoteCount: {
    notNull: true,
    type: Number,
    default: 0
  }
}
```

## Question

```javascript
const Question = {
  _id: ObjectId(),
  owner: {
    type: ObjectId(), // ref USER
    notNull: true
  },
  prompt: {
    type: String,
    notNull: true,
  },
  incorrectAnswerOptions: {
    type: [String],
    notNull: true,
    min: 1
  },
  correctAnswer: {
    type: String,
    notNull: true,
  },
  upVoteCount: {
    notNull: true,
    type: Number,
    default: 0
  },
  downVoteCount: {
    notNull: true,
    type: Number,
    default: 0
  },
  tags: {
    notNull: true,
    default: [],
    type: [ObjectId()], // ref TAG
    max: 20,
  },
}
```

## QuestionAttempt

```javascript
/*
I am uncertain about how exactly to store the information for a QuizAttempt and QuestionAttempt
This might not be the best way.
In particular, I'm concerned about how updates are handled:
  - the Quiz is updated
  - the Question is updated
  - the selected answer is updated
*/
const QuestionAttempt = {
  _id: ObjectId(),
  createdAt: Date,
  creator: {
    type: ObjectId(), // ref USER
    notNull: true
  },
  question: {
    type: ObjectId(), // ref QUESTION
    notNull: true
  },
  answerSelection: {
    type: String,
    default: null, // can be "null" if question was skipped
  }
}
```

## QuizAttempt

```javascript
/*
I am uncertain about how exactly to store the information for a QuizAttempt and QuestionAttempt
This might not be the best way.
In particular, I'm concerned about how updates are handled:
  - the Quiz is updated
  - the Question is updated
  - the selected answer is updated
*/
const QuizAttempt = {
  _id: ObjectId(),
  createdAt: Date,
  creator: {
    type: ObjectId(), // ref USER
    notNull: true
  },
  quiz: {
    type: ObjectId(), // ref QUIZ
    notNull: true
  },
  questionAttempts: {
    type: [ObjectId()], // ref QUESTION_ATTEMPTS
    notNull: true,
    min: 1, // I'm not storing it as a Quiz Attempt if no questions were attempted or even skipped
  }
}
```

## Comments

```javascript
const Comment = {
  _id: ObjectId(),
  createdAt: Date,
  creator: {
    type: ObjectId(), // ref USER
    notNull: true
  },
  parentMediaId: {
    type: ObjectId(), // ref QUIZ or QUESTION
    notNull: true
  },
  subMediaId: {
    type: ObjectId(), // if in response to another comment
    // could be null
  },
  content: {
    type: String,
    notNull: true
  },
  upVoteCount: {
    notNull: true,
    type: Number,
    default: 0
  },
  downVoteCount: {
    notNull: true,
    type: Number,
    default: 0
  },
}
```

## Votes

```javascript
const Vote = {
  _id: ObjectId(),
  user: {
    type: ObjectId(), // ref USER
    notNull: true
  },
  mediaId: {
    type: ObjectId(), // ref QUIZ or QUESTION or COMMENT
    notNull: true
  },
  // how to enforce that only one entry for pair of [user, mediaId]?
  isUp: {
    type: Boolean,
    notNull: true
}
```