import paralleldots
import operator

paralleldots.set_api_key("")


emotion_list = paralleldots.emotion("Leave me alone!")['emotion']
max_emotion = max(emotion_list.items(), key=operator.itemgetter(1))[0]
print(max_emotion)