interface EmailTemplateProps {
  userName: string;
  message: string;
}

export const TrainingStatusEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ message, userName }) => (
  <div>
    <h1>Welcome, {userName}!</h1>
    <p>{message}</p>
  </div>
);
