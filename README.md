# Daily Llama #
#### is a 5 minute guided journal that uses IBM Watson's Sentiment Analysis and Natural Language Understanding APIs to expose trends over time and present data back to the user.   ####

**Features:**
Users can keep a daily Journal (diary) and view all past entries
After a user has written a number (presently 5?) of journal entries, they can visit the Trends page and view extracted data, including the following:
* Calendar of the moods selected by the user (a la github calendar)
* Wordclouds of the common words entered for each short-form answer, based on frequency of words entered and frequency of operative words extracted by IBM Watson Natural Language Understanding.
* _"Dissonance Score"_, where the user's long-form journal entry is processed by IBM Watson's Tone Analyzer and compared against their selected mood. An entry is qualified as _Dissonant_ if their selected mood is incompatible with Watson's analysis of the long-form entry.

**Dependencies:**
* Ruby 2.3.5
* Rails 5.2.1
* PostgreSQL (built using ver. 9.5.14 -- __required: 9.4 or higher (versions supporting JSONB)__)
* jQuery
* IBM Watson APIs - Tone Analyzer & Natural Language Understanding, __(TWO (2) API keys are required)__

# full Setup Instructions and Video Demo expected Q1 2019 #
