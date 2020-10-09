const commonStyles = {
  fill:{
    flex:1
  },
  row:{
    flexDirection: 'row'
  }
};

const colors = {
  gradientRowTop:'#1C3B69',
  gradientRowBottom:'#1D4381',
  textPrimary: '#fff',
  buttonPrimary: '#fff',
  defaultBgColor: '#000',
  textSubheading: '#C1C1C1',
  loadingIndicator: '#fff',
  mainGradient: ['#000000', '#303030'],
};

const getRandomGradientColors = () => {
  let c1 = {
    r: Math.floor(96),
    g: Math.floor(96),
    b: Math.floor(96)
  };
  let c2 = {
    r: Math.floor(205),
    g: Math.floor(205),
    b: Math.floor(205)
  };

  c1.rgb = 'rgb('+c1.r+','+c1.g+','+c1.b+')';
  c2.rgb = 'rgb('+c2.r+','+c2.g+','+c2.b+')';
  return [c2.rgb,c1.rgb];
}


export {
  getRandomGradientColors,
  commonStyles,
  colors
}