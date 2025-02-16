
        const browserLanguage = navigator.language.slice(0, 2);
        const localisationPath = `/localizations/${browserLanguage}.json`;

      
        async function loadLanguage() {
            try {
                const response = await fetch(localisationPath);

                if (!response.ok) {
                    throw new Error(`Language not found: ${browserLanguage}`);
                }

                const data = await response.json();

              
                /* (REMOVED)if (data.title) document.getElementById('title').textContent = data.title;*/
                if (data.description) document.getElementById('description').textContent = data.description;
         //       if (data.feedback_footer_txt) {
        //          document.getElementById('feedback_footer_txt').innerHTML = data.feedback_footer_txt;
                  if (data.search_engine_label) {
                    document.getElementById('search_engine_label').textContent = data.search_engine_label;
                  if (data.query_placeholder) {
                    document.getElementById('query_placeholder').setAttribute('placeholder', data.query_placeholder);
                  if (data.search_button) {
                    document.getElementById('search_button').setAttribute('value', data.search_button);
                    if (data.about) {
                        document.getElementById('button_abt').setAttribute('value', data.about);
                        if (data.about) {
                            document.getElementById('about').textContent = data.about;

                            if (data.feedback) {
                              document.getElementById('feedback').textContent = data.feedback;
                            
                            
                        }
                    } 
                }
                  
      //}
    }
  }           
}
            } catch (error) {
                console.log("Cannot load language:", error);
            }
        }
        loadLanguage();

