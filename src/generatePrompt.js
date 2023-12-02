
const getRandom = (min, max) => {
  var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
	//console.log(random);
  return random;
}

const generatePrompt = () => {
  // 主張系
  const claim = `
    lang: ja
    issue: 小泉進次郎構文の文を1つ作って。
    context:
      type: 1文だけ生成|説明不要|文章のみ|claim
      persona: 小泉進次郎
    examples:
    Always put "body temperature" and "weight" on words.
    The raw material of plastic is petroleum. Surprisingly, people don't know this.
    Everything should be fun, cool, and sexy.
    When Water and oil were mixed, it becomes dressing. This election is all about this remark.
    Ambiguously I came up with a number, 46.
    `
  
  // トートロジー系
  const tautology = `
    lang: ja
    issue: 小泉進次郎構文の文を1つ作って
    context:
      type: 1文だけ生成|説明不要|文章のみ|tautology
      persona: 小泉進次郎
    examples:
    To the point that I don't seem to be remorseful, I remose it. it's my own problem.
    Thanks to working from home, I can carry out my official work remotely.
    I was wondering how old I am after 30 years in my mind, just right after that natural disaster.
    I don't think Japan should stay the way it is now. That's why I think Japan shouldn't stay the way it is now.
    `
  // 大喜利系
  const ogiri = `
    lang: ja
    issue: 小泉進次郎構文の文を1つ作って
    context:
      type: 1文だけ生成|説明不要|文章のみ|ogiri
      persona: 小泉進次郎
    examples:
    I heard you were born on your birthday.
    Bakery stores have lots of bread. 
    Devil is a devil ‼️ Happiness is happiness ‼️
    Breath of Breath.
    [House of Representatives Election] My hometown is my hometown.
    If you wanna watch the night view, I definitely recommend at night. 
    I'm sure there will be medalists from this Olympic. 
    What percent of juice is these apples.
    Underage drinking is something children do.
    `

  const prompts = [claim, tautology, ogiri]
  const prompt = prompts[getRandom(0,2)];
  
  return prompt
}

// generatePrompt();

module.exports = {generatePrompt}