import requests
import json
import pandas as pd
import eel
eel.init('web')
@eel.expose
def weather_element(location, District , element = 'T'):
    # the data is a list [time, value]
    # location--> 臺中市
    # District --> 西屯區

    _location_names = {
        "宜蘭縣": "F-D0047-001",
        "桃園市": "F-D0047-005",
        "新竹縣": "F-D0047-009",
        "苗栗縣": "F-D0047-013",
        "彰化縣": "F-D0047-017",
        "南投縣": "F-D0047-021",
        "雲林縣": "F-D0047-025",
        "嘉義縣": "F-D0047-029",
        "屏東縣": "F-D0047-033",
        "臺東縣": "F-D0047-037",
        "花蓮縣": "F-D0047-041",
        "澎湖縣": "F-D0047-045",
        "基隆市": "F-D0047-049",
        "新竹市": "F-D0047-053",
        "嘉義市": "F-D0047-057",
        "臺北市": "F-D0047-061",
        "高雄市": "F-D0047-065",
        "新北市": "F-D0047-069",
        "臺中市": "F-D0047-073",
        "臺南市": "F-D0047-077",
        "連江縣": "F-D0047-081",
        "金門縣": "F-D0047-085",
    }

    url = f"https://opendata.cwb.gov.tw/api/v1/rest/datastore/{_location_names[location]}?Authorization=CWB-CAABE1A5-C070-40E4-B84C-DD387602B85B&format=JSON&locationName={District}&elementName={element}"
    text = requests.get(url).text
    result = json.loads(requests.get(url).text)

    # take out part of information we want
    result = result["records"]["locations"][0]["location"][0]['weatherElement'][0]['time']
    # Transfer it into DF
    result = pd.DataFrame(result)
    # take out the element value of it
    result['value'] = result['elementValue'].apply(lambda x: x[0]['value'])
    result.drop('elementValue', axis=1)

    if 'startTime' in result.columns:
        result_part1 = result[['startTime','value']]
        result_part2 = result[['endTime','value']].rename(columns={'endTime':'startTime'})
        result = result_part1.append(result_part2,ignore_index=True).sort_values(by=['startTime'])
        result.drop_duplicates(subset='startTime',inplace=True)
        time = result['startTime'].tolist()
     

    elif 'dataTime' in result.columns:
        time = result['dataTime'].tolist()
    value = result['value'].tolist()
    
    return ([time,value])

eel.start('main.html',size = (1000,800))
