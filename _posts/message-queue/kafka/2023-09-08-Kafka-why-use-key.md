---
layout: post
title: "[Kafka] Kafka 란?"
date: 2023-09-08 23:36:00 +09:00
categories: [Kafka]
tags: [Kafka]
comments: true
---

<iframe src="https://giphy.com/embed/26ufdipQqU2lhNA4g" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/producthunt-mind-blown-blow-your-26ufdipQqU2lhNA4g">via GIPHY</a></p>

### 현재 상황

```python
@api.route("/")
class Test(Resoucre):
	def post(self):
		# Data 가공 logic
		# .
		# .
		# .
		try:
      kafka_result = current_app.kafka.send(
          "SAFEDATA-CH-senser-data", key={"devimei": devimei}, value=data
      ).get()

      current_app.logger.debug(f"Published message to Kafka (Offset: {kafka_result.offset}, Partition: {kafka_result.partition})")
      current_app.kafka.flush()

      response = True
	  except Exception as e:
      response = False
      current_app.logger.debug(e)
	  finally:
      return {"result": response}, 201
```

현재 코드에서 key값을 `{"devimei": devimei}` 이 값은 각 센서의 고유한 번호 입니다.

그리고 swagger에서 똑같은 값으로 계속 post 요청을 하였는데 똑같은 파티션에만 topic이 게시되었습니다.

저 당시 저는 **`똑같은 key 값이라도 각각의 파티션에 저장이 되겠지?`** 라는 생각으로 계속 요청을 했습니다. 당연한 말이겠지만 키 값이 같으니 똑같은 파티션에 들어가고 있었습니다.

하하...

### **메시지 분할을 위한 키 사용**

Kafka 메시지에서 키를 사용하는 것은 주로 메시지 분할을 제어하기 위한 것입니다. 

동일한 키가 일관되게 사용되면 Kafka는 동일한 키를 가진 모든 메시지가 동일한 파티션으로 전송되도록 합니다. 이는 순서를 유지하는 데 유용합니다.

시계열 데이터와 같이 순서 보존이 중요한 경우 UUID 또는 레코드의 기본 키와 같은 고유 값을 메시지 키로 사용하는 것이 좋습니다. 이 접근 방식은 네트워크 지연이나 파티션별 문제로 인해 메시지 순서가 중단되는 것을 방지합니다.

Kafka는 기본적으로 최소 1회 메시지 전달 의미 체계를 제공합니다. 이는 메시지 전달이 보장되지만 오류가 발생할 경우 두 번 이상 전달될 수 있음을 의미합니다. 정확히 한 번만 처리하는 의미 체계를 달성하려면 추가 애플리케이션 수준 논리가 필요한 경우가 많으며 리소스 집약적입니다.

키를 사용하여 메시지 순서를 결정하는 것이 중요하지만 균형을 유지하는 것도 중요합니다. 단일 키를 과도하게 사용하면 특정 파티션에서 과도한 트래픽과 잠재적인 성능 병목 현상이 발생할 수 있습니다. 로드 밸런싱이 선호되는 경우 null 키를 사용하면 Kafka의 기본 파티셔너를 사용하여 파티션 전체에 메시지를 보다 균등하게 배포할 수 있습니다.

## Ref

[Apache Kafka 공식문서](https://kafka.apache.org/protocol#protocol_network)
