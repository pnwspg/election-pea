import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{
        themes: {
            light: {
                primary: '#5B4863',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                errer: '#b71c1c',
                info: '#a999b0',
                navcolor: '#5B4863',
                background: '#F5F5F5',
            }
        },
        options: {
            customProperties: true
        },
    }
});
