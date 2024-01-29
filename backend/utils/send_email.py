from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib, ssl

email_from = 'dev.psgurav@gmail.com'
password = 'gynrygeqjxcbcwrs'

def send(email_to, html_file_path,user_full_name):
    # Read HTML content from the file
    with open(html_file_path, 'r', encoding='utf-8') as html_file:
        html_content = html_file.read()
        html_content = html_content.replace("[Customer's Name]",user_full_name)

    # Create a MIMEMultipart class, and set up the From, To, Subject fields
    email_message = MIMEMultipart('alternative')
    email_message['From'] = email_from
    email_message['To'] = email_to
    email_message['Subject'] = "Welcome to DRBANK Online Banking!"

    # Attach the HTML content to the MIME message
    email_message.attach(MIMEText(html_content, "html"))

    # Convert it as a string
    email_string = email_message.as_string()

    # Connect to the Gmail SMTP server and Send Email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(email_from, password)
        server.sendmail(email_from, email_to, email_string)
        print('Mail sent !')

# Example usage: Assuming 'welcome_email.html' is in the same folder as this script
# send('psgurav2001@gmail.com', 'Email.html',"Prasad Gurav")
