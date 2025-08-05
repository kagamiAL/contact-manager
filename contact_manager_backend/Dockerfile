FROM eclipse-temurin:23-jdk-alpine AS build

WORKDIR /workspace
COPY . .
RUN chmod +x gradlew
RUN ./gradlew clean build --no-daemon

FROM eclipse-temurin:23-jdk-alpine

WORKDIR /app

COPY --from=build /workspace/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
