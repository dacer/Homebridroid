package im.dacer.homebridroid;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.jetbrains.annotations.NotNull;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

public class SocketIoModule extends ReactContextBaseJavaModule {
    public static final String TAG = "SocketIoModule";
    private Socket socket;
    public SocketIoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void connect(String address, String token) {
        Log.d(TAG, "connect: " + address + "?token=" + token );
        try {
            IO.Options options = new IO.Options();
            options.query = "token=" + token;
            socket = IO.socket(address, options);
            socket.on("connection", args -> {
                Log.d(TAG, "connected");
            });
            socket.emit("get-layout", "");
        } catch (URISyntaxException e) {
            Log.e(TAG, e.getMessage());
        }
    }

    @ReactMethod
    public void emit(String event) {
        if (socket == null) return ;
        Log.d(TAG, "emit: " + event);
        socket.emit(event);
    }

    @NotNull
    @Override
    public String getName() {
        return "SocketIoModule";
    }
}
