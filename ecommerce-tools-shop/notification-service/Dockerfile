FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

COPY pom.xml .
COPY shared/pom.xml shared/
COPY notification-service/pom.xml notification-service/
COPY order-service/pom.xml order-service/
COPY inventory-service/pom.xml inventory-service/

COPY shared shared
COPY notification-service notification-service

RUN apk add --no-cache maven && \
    mvn package -DskipTests -B -pl notification-service -am

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/notification-service/target/notification-service-*-SNAPSHOT-exec.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
