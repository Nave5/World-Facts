//All facts taken from: https://www.whatarethe7continents.com

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/****************************************************************************************************************
*Evan Hope
* 6/12/18
* Mrs.Sellers
* Prompts user to pick a continent to learn a random fact about then tells user a fact about that continent.
 ****************************************************************************************************************/

'use strict';
const Alexa = require('alexa-sdk');


const APP_ID = 'amzn1.ask.skill.4fc0c91e-ebf4-4d40-9b2d-2d88712a264c';
//constants for functions
const SKILL_NAME = 'World Facts';
const GET_FACT_MESSAGE = "Your fun fact about ";
const HELP_MESSAGE = 'You can say tell me a world fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Exit';
//===========================================================================================================================================
//Facts about all continents
//===========================================================================================================================================
//South America facts
const SOUTHAMERICA = [
    'It is estimated that around 40% of the world’s plant and animal species are found in South America. This is despite it covering less than 12% of the earth’s total land surface.',
    'Five of the top 50 largest cities in the world are located in South America, and starting with the largest, these are Sao Paulo, Lima, Bogota, Rio, and Santiago.',
    'The Amazon rainforest is considered to have the greatest biodiversity in the world, with hundreds of different animals species, around 40,000 plant species and a stunning 2.5 million different species of insects.',
    'The most famous mythical creature in South America is “el chupacabra.” This vampire-like creature is believed to attack cattle and goats and drain their blood.',
    'In Brazil alone, around 150 different languages are spoken. However, the most widely spoken languages are Portuguese and Spanish.',
    'Sao Paolo in Brazil is the largest City in South America. With a population of 20 million (as of 2014), it is also one of the largest cities in the world.',
];
//North America facts
const NORTHAMERICA = [
    'North America is the third largest continent in world, ranking just below Asia and Africa.',
    'Despite being the third largest continent in the world, North America only ranks fourth when it comes to population. It is outranked by Europe which has a population of 739 million.',
    'North America is contained entirely within the Northern and Western Hemispheres.',
    'The most dominant languages in North America are Spanish, French, and English. There are also a large number of people who speak Danish, but they are mostly confined to Greenland.',
    'With an area of almost 10 million square kilometers, Canada is the largest country in North America. It is followed by the United States',
    'There are 23 countries in North America.',
    'North America is bordered by three of the world’s largest oceans, namely the Atlantic, Arctic, and Pacific.',
];
//Africa facts
const AFRICA = [
    'Africa is the second-largest continent in the world both in size and population. As of 2009, about 14.7 percent of the world’s population resides in Africa.',
    'Africa is home to over 1 billion people who speak over 1,500 different languages. One in every four of the world’s language are spoken only in Africa',
    'The shortest distance between Africa and Europe is only 8.9 miles (14.3 kilometers) of ocean.',
    'Both the world’s tallest and largest land animals both come from Africa. They are the giraffe and African elephant, respectively.',
    'The hippopotamus is Africa’s deadliest animal. It kills more people in Africa than do crocodiles and lions combined.',
    'About 41 percent of children in Africa aged between 5-1 years are actively involved in child labor.',
    '39 percent of children under the age of five years in Burundi are underweight.',
    '16 countries in Africa record higher rates of vaccination than the U.S. alone.',
];
//Australia facts
const AUSTRALIA = [
    'There are three times as many sheep than people living in Australia.',
    'Voting in elections in Australia is compulsory for everyone 18 years of age and over, with an initial fine of $72 issued for non-voters. Despite this, only around 81% of eligible Aussie voters cast their vote.',
    'Australia was the second country in the world to grant women the right to vote; this occurred in 1894.',
    'Over 25% of Australias residents were born overseas as of 2012 a number that is expected to increase rapidly.',
    'Someone from Sydney is typically referred to as a Sydney-sider.',
    'Australia is the driest of any continent on earth other than Antarctica.',
    'The Great Barrier Reef is regarded as the worlds largest living organism, and is often listed as one of the Seven Wonders of the Natural World.',
];
//Asia facts
const ASIA = [
    'Asia’s population-of over 4 billion people-is greater than that of the all the other continents combined.',
    'India is the world’s leading producer of Mangoes. Every year it produces about 12 million tons of the fruit.',
    'Of the top ten tallest buildings in the world, nine are found in Asia.',
    'Of the ten largest cities in the world (by population), seven of them are located in Asia.',
    'In China, it is common for children to be named after events. What is interesting, though, is that there are over 4,000 people named Aoyun, or “Olympic Games”.',
    'The original merchant farmers were all from Asia, not Africa.',
    'Some of the most fascinating and revered animals-the tiger, giant panda, king cobra, Komodo dragon, and Asian Elephant-are all found in Asia.',
];
//Antarctica facts
const ANTARCTICA = [
    'The coldest temperature ever recorded on Earth was minus 128.56 degrees Fahrenheit (minus 89.2 degrees Celsius), registered on July 21, 1983, at Antarcticas Vostok station.',
    'On average, Antarctica is the windiest continent. Winds in some places of the continent can reach 200 mph (320 km/h).',
    'Antarctica is the fifth largest continent.',
    'The Antarctic Ice Sheet is the largest single mass of ice on Earth.',
    'Ninety-nine percent of Antarctica is covered by ice.',
    'Antarctica is home to about 70 percent of the planets fresh water, and 90 percent of the planets freshwater ice.',
    'The average thickness of Antarctic ice is about 1 mile.',
    'The highest point on Antarctica is the Vinson Massif at 16,362 feet.',
];
//Europe facts
const EUROPE = [
    'Despite its relatively small size, Europe is quite populous. It comes right after Asia and Africa in terms of population.',
    'It might be the second smallest continent, but Europe is home to the largest country in the world. Russia is so big, in fact, that it takes up forty percent of Europe’s land area.',
    'The name Europe might have originated from the Greek word “eurus,” meaning wide or broad.',
    'While Greenland is closer to North America, it is still considered as part of Europe because it is a dependent territory of Denmark.',
    'Europe’s largest active volcano is Mount Etna, located in Sicila, in the southern part of Italy.',
    'History’s biggest empire was European. In its golden days, the British empire managed to cover one-fourth of the world’s territories.',
    'There are around 730 million people living in Europe today. This figure constitutes about eleven to twelve percent of the world’s current population.',
    'Europe was the main location of several historical periods that made a huge impact on the world like the Renaissance and the Industrial Revolution.',
];


//=========================================================================================================================================
//functions
//=========================================================================================================================================



const handlers = {
    //Starts program
    'introintent': function () {
        //Asks what continents array to call the fact from
        this.response.speak("what continent do you want to learn about?").listen("what continent do you want to learn about?");
        this.emit(':responseReady');
    },
    
    
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    
    
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    
    
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    
    
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    
    
//calls random fact from NORTHAMERICA array
    'northAmericaFacts': function () {
        const factArr = NORTHAMERICA;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + 'North America is ' + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        //Outputs speech and listens for another continent to be said.
        this.response.speak(speechOutput + ' If you want to hear another fact say another or the same continent').listen("what continent do you want to learn about?");
        this.emit(':responseReady');

    },
    //calls random fact from SOUTHAMERICA array
    'southAmericaFacts': function () {
        const factArr = SOUTHAMERICA;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + 'South America is ' + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput + ' If you want to hear another fact say another or the same continent').listen("what continent do you want to learn about?");
        this.emit(':responseReady');
    },
    //calls random fact from EUROPE array
    'europeFacts': function () {
        const factArr = EUROPE;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + 'Europe is ' + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput + ' If you want to hear another fact say another or the same continent').listen("what continent do you want to learn about?");
        this.emit(':responseReady');
    },
    //calls random fact from ASIA array
    'asiaFacts': function () {
        const factArr = ASIA;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + 'Asia is ' + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput + ' If you want to hear another fact say another or the same continent').listen("what continent do you want to learn about?");
        this.emit(':responseReady');
    },
    //calls random fact from AUSTRALIA array
    'australiaFacts': function () {
        const factArr = AUSTRALIA;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + 'Australia is ' + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput + ' If you want to hear another fact say another or the same continent').listen("what continent do you want to learn about?");
        this.emit(':responseReady');
    },
    //calls random fact from ANTARCTICA array
    'antarcticaFacts': function () {
        const factArr = ANTARCTICA;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + 'Antarctica is ' + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput + ' If you want to hear another fact say another or the same continent').listen("what continent do you want to learn about?");
        this.emit(':responseReady');
    },
    //calls random fact from AFRICA array
    'africaFacts': function () {
        const factArr = AFRICA;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + 'Africa is ' + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput + ' If you want to hear another fact say another or the same continent').listen("what continent do you want to learn about?");
        this.emit(':responseReady');
    },
   
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
