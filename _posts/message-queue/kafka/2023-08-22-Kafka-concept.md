---
layout: post
title: "[Kafka] Kafka 란?"
date: 2023-08-22 23:06:00 +09:00
categories: [Kafka]
tags: [Kafka]
comments: true
---

<iframe src="https://giphy.com/embed/tIeCLkB8geYtW" width="100%" height="378" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/shaun-the-sheep-movie-not-my-gif-2016-oscar-nominations-tIeCLkB8geYtW">via GIPHY</a></p>

## Kafka란?

카프카는 분산 메세징 시스템 or 이벤트 스트리밍 시스템 또는 미들웨어라 불리며

**메세지(데이터)의 송신자(Publisher)와 수신자(Consumer)의 중개를 하는 시스템 입니다**.

대용량, 대규모 메세지 데이터를 빠르게 처리하도록 개발된 송신자(Publisher)와 수신자(Consumer)의 중개하는 역할을 합니다.

또한 **분산 환경에 특화**되는 특징을 가지고 있습니다.

Mosquitto나 RabbitMQ 가 사용하고 있는 **MQTT**는 메세지(데이터) 저장보다는 **실시간 메시징 및 통신**에 더 중점을 두고 있습니다. 즉 **데이터 소비가 이루어지면 데이터가 지워지는 특성**이 있습니다

다만 **Kafka**는 **바로 지워지지 않고** **디스크에 유지**되고 있어 **복원**은 물론 소비된 메세지 추적 개념의 offset, commit이 있어 **장애발생 시점을 찾기 쉬우며** 보다 쉽게 대응을 할 수 있습니다.

**카프카는 다양한 사용 사례에 적용됩니다.**

- 증권 거래소, 은행 및 보험과 같은 실시간으로 지불 및 금융 거래를 처리
- 물류 및 자동차 산업과 같이 자동차, 트럭, 차량 및 선적을 실시간으로 추적하고 모니터링
- 공장 및 풍력 발전 단지와 같은 IoT 장치 또는 기타 장비의 센서 데이터를 지속적으로 캡처하고 분석
- 소매, 호텔 및 여행 산업, 모바일 애플리케이션과 같은 고객 상호 작용 및 주문을 수집하고 즉시 대응
- 병원에서 치료 중인 환자를 모니터링하고 상태 변화를 예측하여 응급 상황에서 시기 적절한 치료를 보장
- 회사의 여러 부서에서 생성된 데이터를 연결, 저장 및 사용 가능하게 만듦
- 데이터 플랫폼, 이벤트 중심 아키텍처 및 마이크로서비스(MSA)의 기반 역할

### 카프카의 특징

- **고성능:** 분산 처리, 배치 처리 등 다양한 기법을 사용하여 대량의 데이터를 고속으로 처리할 수 있습니다.
- **데이터 처리의 유연성:** 카프카는 데이터의 처리를 자유롭게 구성할 수 있습니다. 하나의 토픽에 여러 프로듀서와 컨슈머가 접근할 수 있으며, 메시지를 디스크에 영구적으로 저장할 수 있습니다. 이러한 특징은 다양한 데이터 처리 요구사항을 충족하는 데 도움이 됩니다.
- **신뢰성:** 카프카는 데이터의 손실을 최소화하기 위해 다양한 방법을 사용합니다. 데이터를 디스크에 영구적으로 저장하고, 적어도 한 번은 확실하게 데이터를 송신합니다. 또한, 브로커를 복제하여 데이터의 유실 가능성을 더욱 줄입니다.
- **개발 편의성:** 카프카는 다양한 프로그래밍 언어에서 사용할 수 있는 풍부한 API를 제공합니다. 또한, Kafka Connect를 통해 다양한 데이터 소스와 연결할 수 있습니다. 이러한 특징은 카프카를 보다 쉽게 사용할 수 있도록 도와줍니다.

## 카프카를 사용하는 이유

1. **병렬처리에 의한 데이터 처리율 향상** : 카프카는 아래 보실 아키텍처에 보면 데이터를 병렬로 처리함으로서 데이터를 빠르고 효과적으로 처리할 수 있습니다. disk에 순차적으로 데이터를 적재하기 때문에 임의 접근(random access) 방식보다 훨씬 더 빠르게 데이터를 처리합니다.
2. **데이터 유실 방지** : disk에 적재되기 때문에 만약 불의의 사고로 서버가 다운되었을 시에도 데이터가 유실되는 일 없이 재시작하여 기존 데이터를 안정적으로 처리 가능합니다.
3. **클러스터링에 의한 고가용성 서비스** : Scale-out이 가능하여 시스템 확장이 용이하며 어떤 하나 혹은 몇 개의 서버가 다운되도 서비스 자체가 중단될 일 없이 시스템이 운용가능합니다.

## Ref

[Apache Kafka 공식문서](https://kafka.apache.org/protocol#protocol_network)

[[Kafka] 카프카란? 주요개념 및 용어 소개 by IfUWanna](https://ifuwanna.tistory.com/487)

[아파치 카프카(Apache Kafka) 아키텍처 및 동작 방식](https://engkimbs.tistory.com/691)
