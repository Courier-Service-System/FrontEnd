type OrderStatus = "pending" | "ready" | "on_the_way" | "delivered";

interface StoredStatuses {
  [key: number]: OrderStatus;
}

export const getStoredStatuses = (): StoredStatuses => {
  const stored = localStorage.getItem("orderStatuses");
  return stored ? JSON.parse(stored) : {};
};

export const updateOrderStatus = (
  orderId: number,
  status: OrderStatus
): void => {
  const statuses = getStoredStatuses();
  statuses[orderId] = status;
  localStorage.setItem("orderStatuses", JSON.stringify(statuses));

  broadcastStatusChange(orderId, status);
};

export const clearStoredStatuses = (): void => {
  localStorage.removeItem("orderStatuses");
};

const statusChannel = new BroadcastChannel("orderStatus");

const broadcastStatusChange = (orderId: number, status: OrderStatus): void => {
  statusChannel.postMessage({ orderId, status });
};

export const subscribeToStatusUpdates = (
  callback: (orderId: number, status: OrderStatus) => void
): (() => void) => {
  const handleMessage = (event: MessageEvent) => {
    const { orderId, status } = event.data;
    callback(orderId, status);
  };

  statusChannel.addEventListener("message", handleMessage);

  return () => statusChannel.removeEventListener("message", handleMessage);
};
