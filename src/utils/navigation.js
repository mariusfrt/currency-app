import React from 'react';
import { Navigation } from 'react-native-navigation';
import { NAV_BASE_STACK, SCREEN_COMPONENTS } from './constants';
import Home from '../screens/Home';
import TopBar from '../components/TopBar';
import Settings from '../screens/Settings';
import History from '../screens/History';
import { colors } from '../theme/theme.style';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { persistStore } from 'redux-persist';
import Ionicons from "react-native-vector-icons/Ionicons";

const store = configureStore();
 
export const navigateTo = (screen: string) => {
  Navigation.push(NAV_BASE_STACK, {
    component: {
      id:screen,
      name: screen,
    },
  })
 };

const rehydrateStore = (storeToHydrate: any) => (
  new Promise((resolve) => {
    persistStore(storeToHydrate, undefined, () => {
      resolve()
    })
  })
);

const setupTabNavigationLayout = async () => {
  const tabIcons = await Promise.all([
    Ionicons.getImageSource("home-sharp", 30),
    Ionicons.getImageSource("analytics-sharp", 30),
  ])
  await Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: colors.defaultBgColor
      },
      backButton: {
        color: colors.buttonPrimary
      },
      title: {
        color: colors.textPrimary
      },
    },
    layout: {
      orientation: ['portrait']
    },
    bottomTabs: {
      visible: true,
      animate: true,
      testID: 'bottomTabsTestID',
      drawBehind: false,
      backgroundColor: '#3F3D3E',
    },
    bottomTab: {
      textColor: colors.textPrimary,
      selectedIconColor: colors.textPrimary,
      selectedTextColor: colors.textPrimary,
      iconColor: colors.textPrimary,
    },
    animations: {
      push: {
        enabled: 'true',
        content: {
          x: {
            from: 2000,
            to: 0,
            duration: 300
          }
        }
      },
      pop: {
        enabled: 'true',
        content: {
          x: {
            from: 0,
            to: 2000,
            duration: 300
          }
        }
      }
    }
  });

  await Promise.all([rehydrateStore(store)])

  const promise = new Promise((resolve) => {
    Navigation.setRoot({
      root: {
        sideMenu:{
          id: NAV_BASE_STACK,
          right: {
            component: {
              name: SCREEN_COMPONENTS.SETTINGS
            }
          },
          center:{
            bottomTabs: {
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: SCREEN_COMPONENTS.HOME,
                          id:SCREEN_COMPONENTS.HOME,
                          options: {
                            topBar: {
                              title: {
                                component: {
                                  name: SCREEN_COMPONENTS.TOPBAR,
                                  alignment: 'center',
                                },
                              },
                            },
                            bottomTab: {
                              text: 'Home',
                              icon: tabIcons[0],
                              fontWeight: 'bold'
                            }
                          },
                        }
                      },
                      
                    ]
                  }
                },
                {
                  stack: {
                    
                    id: SCREEN_COMPONENTS.HISTORY,
                    children: [
                      {
                        component: {
                          name: SCREEN_COMPONENTS.HISTORY,
                          id: SCREEN_COMPONENTS.HISTORY,
                          options: {
                            topBar: {
                              title: {
                                component: {
                                  name: SCREEN_COMPONENTS.TOPBAR,
                                  alignment: 'center',
                                },
                              },
                            },
                            bottomTab: {
                              text: 'History',
                              icon: tabIcons[1],
                              fontWeight: 'bold'
                            }
                          },
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    });
    return promise
  });
}

export const appStart = async () => {
  Navigation.registerComponent(SCREEN_COMPONENTS.HOME, () => (props) => (
    <Provider store={store}>
      <Home {...props} />
    </Provider>
  ), () => Home);

  Navigation.registerComponent(SCREEN_COMPONENTS.TOPBAR, () => (props) => (
    <Provider store={store}>
      <TopBar {...props} />
    </Provider>
  ), () => TopBar);

  Navigation.registerComponent(SCREEN_COMPONENTS.SETTINGS, () => (props) => (
    <Provider store={store}>
      <Settings {...props} />
    </Provider>
  ), () => Settings);

  Navigation.registerComponent(SCREEN_COMPONENTS.HISTORY, () => (props) => (
    <Provider store={store}>
      <History {...props} />
    </Provider>
  ), () => History);
  
  Navigation.events().registerAppLaunchedListener(async () => {
    await setupTabNavigationLayout()
  }); 
}

export const setNavigationTitle = (componentId, title) => {
  Navigation.mergeOptions(
    componentId,
    { 
      topBar: { 
        visible: true, 
        title: { 
          text: title
        }
      }
    }
  );
}

export const toggleSettingsMenu = (visible) => {
  Navigation.mergeOptions(SCREEN_COMPONENTS.HOME,{
    sideMenu:{
      right:{
        visible
      }
    }
  })
}

export const bindNavigationEvents = component => Navigation.events().bindComponent(component);

