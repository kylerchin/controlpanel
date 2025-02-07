import React, { useEffect } from 'react'
import dynamic from 'next/dynamic';

//import tableau from 'tableau-api';
//var tableau = require('tableau-api');

declare global {
  interface Window {
    tableau: any;
  }
}

type MyProps = { 
  url: string;  
};

type MyState = {
  value: string;
  vizContainer: any;
}

type TableauType = React.Component<MyProps, MyState> & {vizContainer: any}

const TableauEmbedFunc = (props) => {
  var vizContainer;

  useEffect(() => {

    if (typeof window !== 'undefined') {
      if (process.browser) {
        // client-side-only code
        const vizUrl = props.url;
        var thingwidth = document.documentElement.clientWidth
    
        var deviceType = "desktop";
    
        if (thingwidth < 767) {
          deviceType = "mobile"
        } else {
          deviceType = 'desktop'
        }
        var options = {
          hideTabs: true,
          onFirstInteractive: function () {
            console.log("Run this code when the viz has finished loading.");
            //      document.querySelector('.tableauembed > iframe').style.height = '100%'
          },
          device: deviceType
        };
          
       // const vizContainer = vizContainer;
          
        console.log('vizContainer', vizContainer)
        console.log('window.tableau', window.tableau)
        // @ts-ignore: Unreachable code error
        if (typeof window.tableau !== 'undefined') {
          // @ts-ignore: Unreachable code error
          let viz = new window.tableau.Viz(vizContainer, vizUrl, options)
        }
      }

      // const {tableau} = window;

    
    }

  })

  return (
    <div className='height100'>

      <div className='tableauembed height100' ref={(div) => {
      vizContainer = div;
    }}>
    </div>
    </div>
   
  )
}

export default TableauEmbedFunc;