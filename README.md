# Daily Llama #
#### is a 5 minute guided journal that uses IBM Watson's Sentiment Analysis and Natural Language Understanding APIs to expose trends over time and present data back to the user.   ####

**Features:**
Users can keep a daily Journal (diary) and view all past entries
After a user has written a number (presently 5?) of journal entries, they can visit the Trends page and view extracted data, including the following:
* Calendar of the moods selected by the user (a la github calendar)
* Wordclouds of the common words entered for each short-form answer, based on frequency of words entered and frequency of operative __words extracted by IBM Watson Natural Language Understanding.__
* _"Dissonance Score"_, where the user's long-form journal entry is processed by IBM Watson's Tone Analyzer and compared against their selected mood. An entry is qualified as _Dissonant_ if their selected mood is incompatible with Watson's analysis of the long-form entry.

**Dependencies:**
* Ruby 2.3.5
* Rails 5.2.1
* PostgreSQL (built using ver. 9.5.14 -- __required: 9.4 or higher (versions supporting JSONB)__)
* jQuery
* IBM Watson APIs - Tone Analyzer & Natural Language Understanding, __(TWO (2) API keys are required)__

# Full Setup Instructions and Video Demo expected Q1 2019 #

![landing](https://user-images.githubusercontent.com/42853487/51060219-eade8f80-15bc-11e9-86ef-6954fc9a795a.png)
![mood](https://user-images.githubusercontent.com/42853487/51060233-fb8f0580-15bc-11e9-9894-99b4e270fdbe.png)
![calendar](https://user-images.githubusercontent.com/42853487/51060237-00ec5000-15bd-11e9-9cdc-9b8ed69af214.png)
![entry](https://user-images.githubusercontent.com/42853487/51060240-047fd700-15bd-11e9-930d-780b5f512f03.png)
